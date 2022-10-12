import type { Plugin } from 'vite';
export default function vitePluginImplicitCssModules(): Plugin {
  return {
    name: 'vite-plugin-implicit-css-modules',

    transform(src: string, id: string) {
      // 只处理 .vue 文件
      if (!/(\.vue)$/i.test(id)) {
        return src;
      }

      // 匹配获取所有的 <style> 内容
      const reg = /<style(?:\slang="\w+")?\s*module(=["']\w+["'])?>[^<]+<\/style>/gmi;
      const styleCodes = [...src.matchAll(reg)];
      if (!styleCodes || !styleCodes.length) {
        return src;
      }

      styleCodes.forEach((styleCode: RegExpMatchArray) => {
        const moduleId = getModuleId(styleCode);
        const templateReg = /<template>[\s\S]*<\/template>/gmi;
        const templateCode = src.match(templateReg);
        // 处理 template 中的 class
        if (templateCode) {
          const resolved = resolveCssModules(styleCode[0], templateCode[0], moduleId);
          src = src.replace(templateReg, resolved);
        }
      })
      console.log('src', src)
      return src;
    },
  };
}


function resolveCssModules(style: string, template: string, moduleId: string): string {
  // 先删除 style 中的注释
  let styleStr = style.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '');
  // 移除 :global 声明
  styleStr = styleStr.replace(/:global[^{]*/gmi, '');

  const classReg = /(?<=\.).+(?=\s*{)/gim;
  let classNames = styleStr.match(classReg);

  if (!classNames) {
    return template;
  }

  // 去除空格
  classNames = classNames.map((item: string) => item.trim());

  let result = template;

  // 替换 template 中的单个 class name 为 module class
  classNames.forEach((className: string) => {
    const reg = new RegExp(`class="\\s*${className}\\s*"`, 'gim');
    result = result.replace(reg, `:class="${moduleId}['${className}']"`);
  });

  // 查找是否有多个 class name 的情况
  const multiClassNames = result.match(/(?<!:)class="\s*[^\s|"]+\s+[^"]*"/gim);
  // 没有多个 class name 情况，直接返回
  if (!multiClassNames) {
    return result;
  }

  // 开始处理有多个 class name 的情况
  multiClassNames.forEach((str: string) => {
    const classNameStr = str.replace(/class="/gim, '').replace(/"/gim, '');
    let classNameArr = classNameStr.split(' ');

    // 找出其中的 css modules class
    const moduleClassNameArr = classNameArr.filter((item: string) => (classNames || []).includes(item));
    // 处理 css modules class
    let moduleClassStr = '';
    if (moduleClassNameArr.length) {
      moduleClassStr = ':class="[';
      // 因为 class name 可能有连字符 - ,这里不能直接用 . 拼接
      moduleClassStr += moduleClassNameArr.map((item: string) => `${moduleId}['${item}']`).join(',');
      moduleClassStr += ']"';
    }

    // 普通 class name
    classNameArr = classNameArr.filter((item: string) => !((classNames || []).includes(item)) && item);
    // 处理普通 class
    let classStr = '';
    if (classNameArr.length) {
      classStr = ` class="${classNameArr.join(' ')}"`;
    }
    result = result.replace(str, `${moduleClassStr}${classStr}`);
  });

  return result;
}

function getModuleId(styleCode: RegExpMatchArray) {
  if (styleCode?.[1]) {
    return styleCode[1].replace(/=/i, '').replace(/["']/gi, '');
  }
  return '$style';
}
