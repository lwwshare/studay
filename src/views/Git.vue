<template>
    <div>    
    </div>
</template>
<script>
    /*
1.git clone 地址
2.隐藏的.git是本地仓库 存储所有版本信息
3.git log /查看所有提交记录
4.git status /查看工作目录当前状态
5.git add ./文件夹/文件名 /提交的是改动/使git跟踪文件 untracked未跟踪->staged已暂存
6.git commit '提交信息' git ci;
7.vim/nano /i进入编辑模式 esc 退出编辑模式 ZZ 保存并退出（用 Shift 键或 Capslock 键都可以） ：wq :wq!强制退出
8.Git 的管理是目录级别，而不是设备级别的。
9.git pull /拉取中央仓库代码
10.git branch feature1 /创建分支
11.git checkout feature1 /将HEAD切换到feature1上
12.git checkout -b feature1 /创建分支同事移动HEAD
13.git checkout master /切换到主分支 HEAD 切换
14.git branch -d feature1 /删除分支
15.HEAD 指向的 branch 不能删除。如果要删除 HEAD 指向的 branch，需要先用 checkout 把 HEAD 指向其他地方。
16.branch分支只是引用
17.1先提交分支上的代码 commit
18.2再回到master 分支上 pull让本地master和远程同步 
19.3git merge feature1/吧分支合并到master
20.git push/把本地代码合并到远程仓库
21.git branch -d books /git push origin -d books 删除本地和远程的features分支
22.pull request 去仓库创建安个pull request 方便讨论分支
23.切换任务是很简单的。你只要稍微把目前未提交的代码简单收尾一下，然后做一个带有「未完成」标记的提交（例如，在提交信息里标上「TODO」），然后回到 master 去创建一个新的 branch 就好了。
24.git log /看看历史记录 git log -p /查看详细历史记录
25.git log --stat /查看简要同级
26.git show sha1码 文件名 /查看具体的commit
27.git diff /对比工作目录和暂存区
28.git diff --staged /对比暂存区和上一条提交
29.git diff HEAD /对比工作目录与上一条提交
30.rebase /变基 git checkout branch1->git rebase master->git checkout maser->git merge branch1
31.rebase 站在被rebase的commit上进行操作的，与commit相反
32.commit --amend[修正的意思] 
33.如果（最新的提交）内容有错误：修改一下-> git add . ->git commit --amend
34.rebase --interactive(交互式rebase)
    .git rebase -i HEAD^^(偏移符号^：表示把commit往回偏移几次，~：HEAD~5:表示head指向的commit往前5个commit)
    .pick改成edit之后 git add . ->git commit --amend
    .最后git rebase --continue
35.git reset --hard HEAD^ /丢弃最新的提交，你被撤销的那条提交并没有消失，只是你不再用到它了
36.git rebase -i HEAD^^ /丢弃旧提交， 直接在编辑页面删掉那行commit
37.git rebase --onto HEAD^^ HEAD^ branch1 撤销之前的提交
38.代码push过发现写错->本地修改commit或者删掉->强行push:git push origin branch1 -f
39.出错的内容已经合并到master: git revert HEAD^
40.reset 移动HEAD 以及它所指向的branch
    .git reset --hard branch2 吧HEAD移动到branch2
    .reset --hard会在重置HEAD和branch的同时，重置工作目录的内容，未提交的新内容会被擦掉
    .reset --soft保留工作目录：会在重置HEAD和branch的同时，保存工作目录和暂存区的内容
    这就是 --soft 和 --hard 的区别：--hard 会清空工作目录的改动，而 --soft 则会保留工作目录的内容，并把因为保留工作目录内容所带来的新的文件差异放进暂存区
    .git reset HEAD^ 不加参数：保留工作目录,并清空暂存区
41.checkout本质：签出指定的commit
    git checkout HEAD^^
    git checkout master~5
    git checkout 78a4ec^
    git checkout -- <文件名>撤销指定文件的修改
    git checkout --detach 让HEAD和brancht脱离 但不移动
42.git stash [藏匿]临时存放工作目录的改动
    git stash -u 把没有add的内容也存起来
    git stash pop
43.恢复branch
    git relog /查看引用的移动记录 不指定引用就显示HEAD的引用记录
    git checkout <commit记录>
    git checkout -b branch1 
    切换回某次的移动记录上然后重新创建branch1
    git reflog master 查看master的移动历史
44..gitignore：排除不想被管理的文件
    
*/
export default {
    name: 'Git',
    data () {
        return {}
    }
}
</script>