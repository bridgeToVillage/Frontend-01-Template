function create(Cls,attributes,...children) {
    // console.log(arguments)
    let o = new Cls({
        timer: {}
    });
    for(let name in attributes){
        o.setAttribute(name, attributes[name])
    }

    // console.log(children)
    for(let child of children) {
        o.appendChild(child);
    }

    return o;
}

class Parent  {
    constructor(config) {
        this.children = [];
        this.root = document.createElement("div")
    }

    set class(v) {
        console.log("Parent::class",v)
    }

    setAttribute(name, value){
        this.root.setAttribute(name,value)
    }

    appendChild(child) {
        child.mountTo(this.root)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
    appendChild(child) {
        console.log(child)
    }
}
class Child  {
    constructor(config) {
        this.children = [];
        this.root = document.createElement("div")
    }

    set class(v) {
        console.log("Parent::class",v)
    }

    setAttribute(name, value){
        this.root.setAttribute(name,value)
    }

    appendChild(child) {
        child.mountTo(this.root)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
    appendChild(child) {
        console.log(child)
    }
}

let component = <Parent id="a" class="b">
    <Child></Child>
    <Child></Child>
    <Child></Child>
</Parent>

component.mountTo(document.body);
// componet.setAttribute("id", "a");