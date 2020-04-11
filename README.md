## schema-generator

在开发模块时，我们需要做一些配置的工作，一般都是先编写scema文件，再编写mock数据。其实这2个工作有一点重复，我们可以从mock数据结构中反推出schema结构，自动生成。

schema生成器就是用来解决这个问题，它可以帮助开发者从繁杂的schema编写工作中解放出来，配置越复杂，提升的效率也就越高，尤其是针对schema不熟悉的同学。


## 使用

### 安装schema生成器
```sh
$ tnpm i -g @ali/schema-generator
```

### 通过命令行进行使用
```js
schema -m ./mock.json -s ./schema.json
```

### title

因为mock数据只包换了具体的字段名和数据，所以schema的title字段无法自动生成，默认使用的是字段名。

但是，在生成器中也定义了一些通用的标题映射，通过在命令行中添加title参数进行使用
```js
schema -m ./mock.json -s ./schema.json --title
```

### default 

如果schema需要有默认值的话，可以在命令行中添加default参数
```js
schema -m ./mock.json -s ./schema.json --default
```

## 注意

在定义字段名时要用驼峰式，并且要尽量简单，比如商品标题不要用item_title, 而是用itemTitle，但最佳的方案是title，这样在自动映射标题的更有可能被匹配上。

在编写mock数据的时候也要遵守shema本身的一些规范，比如：

* 不要直接在一级json中直接编写具体的配置字段。

```json
# wrong
{
  "id": 1,
  "title": "hello",
  "price": 12
}
```

```json
# right
{
  "item": {
    "id": 1,
    "title": "hello",
    "price": 12
  }
}
```

* 在数组中只能放对象，而且不要为空

```json
# wrong
{
  "items": [1, 2, 3]
}

# wrong
{
  "items": []
}

# wrong
{
  "items": [
    [
      {id: 1}
    ]
  ]
}
```

```json
# right
{
  "items": [
    {"id": 1},
    {"id": 2},
    {"id": 3}
  ]
}
```


### 也可以通过vscode插件进行使用

1. 在vscode插件市场搜索schema-generator并安装

![install](https://gw.alicdn.com/tfs/TB15bhOyQT2gK0jSZFkXXcIQFXa-906-762.png)

2. 右键mock文件，选择schema生成器菜单即可

![use](https://gw.alicdn.com/tfs/TB1VGqxyuT2gK0jSZFvXXXnFXXa-1022-650.png)
