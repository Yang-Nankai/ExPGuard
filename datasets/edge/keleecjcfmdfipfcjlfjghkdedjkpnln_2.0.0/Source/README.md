# Wash Baidu!

清除牛皮藓，营造良好网络环境

作为老牌中文搜索引擎，百度的资源和可达性还是有一些价值，但真的是，太难看太多广告了，洗一下。

## 示例
### 洗之后
  ![image](https://user-images.githubusercontent.com/1983142/169694711-c0dbb37f-5ade-4560-b5a2-0786cc99703d.png)

  ![image](https://user-images.githubusercontent.com/1983142/169694706-0839474f-a7ce-4d8a-8e2a-ff3c010b79d5.png)

### 洗之前
  ![image](https://user-images.githubusercontent.com/1983142/169694670-17221b9a-17c1-439a-8d66-9801ef5455a7.png)

  ![image](https://user-images.githubusercontent.com/1983142/169694675-b021ddde-6812-4aba-a721-4acadd60773e.png)

## 安装

<a href="https://chrome.google.com/webstore/detail/washbaidu/bhiodmiooehmkihcpibmohdpmblnmhdb?hl=en" target="_blank">Chrome Store</a>

## TODO
 - [x] config popup 
 - [x] dynamic style 
 - [x] optimize icons / descriptions / screenshots 
 - [x] Meiqiu theme 
 - [ ] configurable blocks/segments visibility
 - [x] customize color/style 
 - [x] material-ui color schema 

## 打包
```sh
# 打基线
git tag -a v1.9.8rc1 -m "initial 1.9.1 rc1"

git checkout <tag_version>

# 压缩两个styles.css (目前还是手工)
./themes/totoro/styles.css
./themes/teto/styles.css

# 退到上层目录，执行打包（或者执行pkg.sh)
cd ..
stashName=`git stash create`;
git archive --format=zip $stashName -o ../washbaidu_latest.zip


# 得到washbaidu_latest.zip，通过Chrome浏览器或者Chrome商城打包成crx
```
