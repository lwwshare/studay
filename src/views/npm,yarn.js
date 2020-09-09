/**
 1.npm                  yarn
npm install                 yarn
npm install react --save    yarn add react
npm uninstall react --save  yarn remove react
npm install react --save-dev yarn add react -dev
npm undate --save            yarn upgrade
同一个项目，安装的版本无法保证一致性
安装的时候，包会在同一时间下载和安装
中途某个时候一个包抛出了错误，但是nom会继续下载和安装
有关错误包的错误信息就会再一大堆npm打印的警告众丢失，
而且你甚至永远不会注意到实际发生了什么错误



yarn
速度快：并行安装
离线模式：如果之前安装过一个软件包，用yarn再次安装时就会从缓存中取
按章版本统一，每次会有一个lock锁定文件
更简洁的输出
所有的依赖包不管被 引用所少次，安装这个包时


 */