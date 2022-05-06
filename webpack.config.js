// 引入包,帮助拼接路径
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// webpack中所有的配置信息都应该写在module.exports中
module.exports = {
    // 指定入口文件
    entry:"/src/index.ts",
    mode:"development",
    // 指定打包文件所在目录
    output:{
        // 指定打包文件的目录
        path:path.resolve(__dirname,'dist'),
        // 打包后文件的文件
        filename:"bundle.js",
        environment:{
            // 禁止转化后使用箭头函数,为了兼容i浏览器,ie不支持箭头函数
            arrowFunction :false,
            const:false
        }
    },
    // 指定webpack打包时 要使用的模块
    module:{
        // 指定要加载的规则
        rules:[
            {
                // 指定规则生效的文件
                test:/\.ts$/,//匹配以ts结尾的文件
                // 要使用的loader
                use:[
                    {
                        // 配置bable
                        // 指定加载器
                        loader:"babel-loader",
                        // 设置babel
                        options :{
                            // 设置预定义的环境
                            presets:[
                                [
                                    //指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        targets:{
                                            // 要兼容的目标浏览器
                                            "chrome":"88",
                                            "ie":"11"
                                        },
                                        // 置顶corejs的版本
                                        "corejs":"3",
                                        // 使用corejs的方式,"usage"表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }

                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude:/node-modules/,
                
            },
            // 设置less文件的处理
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",

                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    // 配置webpack插件
    plugins:[
        new CleanWebpackPlugin(),//用于清除打包目录下的所有文件
        new HTMLWebpackPlugin(
            {
                // title:'这是一个自定义的title'
                template:"./src/index.html"
            }
        ),
    ],
    // 用来设置引用模块
    resolve: {
        // 表示以ts,js为扩展名结尾的文件可以当成模块来引用
        extensions: [".ts", ".js"]
    },


}