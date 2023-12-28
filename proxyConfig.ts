import { loadEnv } from 'vite'
// 这里是开发环境的代理配置
const devProxy = (mode:any) => {
    return {
        // 开发
        '/dcim': {
            // @ts-ignore
            target: loadEnv(mode, process.cwd()).VITE_DEV_PATH,
            changeOrigin: true,
            ws: true,
            secure: true,
        },
        // 开发首页缩略图
        '/data/file': {
            // @ts-ignore
            target: loadEnv(mode, process.cwd()).VITE_DEV_PATH,
            changeOrigin: true,
            ws: true,
            secure: true,
        },
        // 开发 图片
        '/svgConfig/customLargeScreen': {
            // @ts-ignore
            target: loadEnv(mode, process.cwd()).VITE_DEV_PATH,
            changeOrigin: true,
            // rewrite: (path) => path.replace(new RegExp(`^/svgConfig/customLargeScreen`), ''),
            ws: true,
            secure: true,
        },
    };
}

// 这里是生产环境的代理配置
const prodProxy = (mode:any) => {
    return {
        // 生产list页缩略图 开发时注释掉
        '/svgConfig/customLargeScreen/data/file': {
            // @ts-ignore
            target: loadEnv(mode, process.cwd()).VITE_DEV_PATH,
            changeOrigin: true,
            rewrite: (path:any) => {
                console.log(path.replace(new RegExp(`^/svgConfig/customLargeScreen/data/file`), '/data/file'))
                return path.replace(new RegExp(`^/svgConfig/customLargeScreen/data/file`), '/data/file')
            },
            ws: true,
            secure: true,
        },
    }
}

// 根据环境变量导出相应的配置
export const proxyConfig = process.env.NODE_ENV === 'production' ? prodProxy : devProxy;
