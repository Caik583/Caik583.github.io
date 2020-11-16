# music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




### 歌曲的查询列表，可以获取歌曲的hash值，第二个是歌曲的地址，可以根据一个查询列表中的hash值来获取歌曲的地址

```
    http://songsearch.kugou.com/song_search_v2?callback=jQuery191034642999175022426_1489023388639&keyword=  {歌曲名称}&page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1& privilege_filter=0&_=1489023388641

```


```
    http://www.kugou.com/yy/index.php?r=play/getdata&hash={歌曲hash值}

```