* 309d124 - (HEAD -> master) second step: make the route to be a factory function (2 minutes a
* 6ae9aa9 - first step: make a createApp factory function and add client and server entry sepa
* 1721490 - vue-cli webpack initial project (10 minutes ago) <AaronFlower>
  lines 1-3/3 (END)





至此我们的客户端已经调整完毕，那么我开到哪调整服务器端的啦。服务器端用 vue-server-render 渲染，首先安装 vue-server-renter。 

- add server entry  // 简单渲染不需要 route 和 store . 

创建一个 webpack 的 vue ssr 的配置用来生成  vue-ssr-server-bundle.json.

然后创建的服务器通过读取 vue-ssr-server-bundle.json 来启动服务器，通过 createBundleRenderer 创建的 renderer 来渲染。



