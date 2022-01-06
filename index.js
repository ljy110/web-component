// 自定义标签，继承HTMLElement，继承html属性
class CustomElementStart extends HTMLElement {
    constructor() {
        super();
        this.render()
    }
    connectedCallback() {
        console.log('connectedCallback')
    }

    // 该生命周期触发时机不一定,要配合observedAttributes一起使用
    attributeChangedCallback(name) {
        console.log('attributeChangedCallback', name)
    }

    //元素被remove时
    disconnectedCallback() {
        console.log('remove')
    }

    static get observedAttributes() { return ['text']}

    render() {
        const shadow = this.attachShadow({ mode: 'open' })
        const text = document.createElement('span')
        text.textContent = 'hi'
        text.style = 'color: red'
        shadow.append(text)

        // 使用template构建内容引用
        const template = document.getElementById('my-paragraph')
        if (template) {
            let templateContent = template.content
            shadow.appendChild(templateContent.cloneNode(true))
        }
        const slot2 = document.createElement('slot'); 
        slot2.innerHTML = '123'
        slot2.setAttribute('name', 'newText2'); 
        shadow.appendChild(slot2);
    }
}

const app = document.querySelector('#app')
app.innerHTML = '<template id="my-paragraph"><style>span {color: white;background-color: #666;padding: 5px;}</style><p>My paragraph</p></template>'; 

const ele = document.createElement('custom-element-start')
// 注册一个custom element
ele.setAttribute('text', '123')
ele.innerHTML = '<p slot="newText2">newText2</p>'
customElements.define('custom-element-start', CustomElementStart)
app.appendChild(ele)
app.removeChild(ele)
// customElements.upgrade(ele) // 在append之前去更新自定义元素
// console.log(ele instanceof CustomElementStart, ele.shadowRoot)