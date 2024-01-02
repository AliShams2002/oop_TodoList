class TodoObj {
    constructor(id, inputTitle, done) {
        this.id = id;
        this.title = inputTitle.toUpperCase();
        this.done = done;
    }
}

class Element {
    constructor() {
        this.listUI = document.querySelector('.elements-box');
        this.todoArray = [];

        this.getLocalStorage();
        this.jobsHtmlHandler();
    }

    add(id, inputTitle, done = false) {
        this.newTodo = new TodoObj(id, inputTitle, done);

        this.todoArray.push(this.newTodo);

        console.log(this.newTodo);

        this.creatElement(this.newTodo.id);

        this.setLocalStorage();
        this.jobsHtmlHandler();
    }

    creatElement(id) {
        const newElement = document.createElement('div');

        newElement.className = 'element-box';
    
        newElement.id = `task_${id}`;
    
        this.todoArray.forEach((obj) => {
            newElement.innerHTML = 
            `
                <div class="title">${obj.title}
                    <div id = "item_${id}}"></div>
                </div>
                <div class="remove-icon"><ion-icon name="trash-outline" class = "remove-btn"></ion-icon></ion-icon><div></div>
            `;
        })

        this.listUI.append(newElement);

        newElement.lastElementChild.addEventListener('click', ()=> {
            const massage = confirm('Do you want to delete this element?');

            if(massage){
                let index = 0;
        
                for(let item of this.todoArray){
                    if(item.id === id) {
                        break;
                    }
                    
                    index++;
                }

                this.todoArray.splice(index, 1);
            
                const check = document.getElementById(`task_${id}`).remove();

                this.jobsHtmlHandler();
            }

            this.setLocalStorage();
        });

        if(this.findItem(id).done == true) {
            newElement.classList.remove('element-box');
            newElement.classList.add('complited');
        }
        else {
            newElement.classList.add('element-box');
            newElement.classList.remove('complited');
        }

        newElement.querySelector('.title').addEventListener('click', () => {
            newElement.classList.toggle('element-box');
            newElement.classList.toggle('complited');
            if(newElement.classList.contains('complited')){
                this.findItem(id).done = true;
                newElement.querySelector('.title').classList.add('line-through');
                this.jobsHtmlHandler();
                this.setLocalStorage();           
            }
            else {
                this.findItem(id).done = false;
                newElement.querySelector('.title').classList.remove('line-through');
                this.jobsHtmlHandler();
                this.setLocalStorage();
            }
        })
    }

    findItem(id) {
        return this.todoArray.find(item => item.id === id);
    }

    jobsHtmlHandler() {
        document.getElementById('all-jobs').innerHTML = `all-jobs = ${this.todoArray.length}`;

        document.getElementById('done').innerHTML = `done = ${this.todoArray.filter(item => item.done).length}`;

        document.getElementById('undone').innerHTML = `undone = ${this.todoArray.filter(item => !item.done).length}`;
    }

    setLocalStorage() {
        localStorage.setItem('uuid', JSON.stringify(this.todoArray));
    }

    getLocalStorage() {
        const item = localStorage.getItem('uuid');

        if(! item) return;

        const parsedItems = JSON.parse(localStorage.getItem('uuid'));

        parsedItems.forEach(item => {
            this.add(item.id, item.title, item.done);
        })
    }
}

class getElementTitle {
    constructor() {
        this.addbtnEL = document.getElementById('add-btn');
        this.inputBoxEL = document.getElementById('input');
        this.getIdLength();

        this.idLength = this.getIdLength();

        this.clicked();
    }

    clicked() {             
        
        this.addbtnEL.addEventListener('click', () => {
            if(! this.inputBoxEL.value) {
                alert('Please enter the amount correctly!');
    
                return;
            }

            App.getElements().add(this.idLength, this.inputBoxEL.value, false);
            this.reset();
            this.idLength++;
            this.setIdlength();
        })
    }

    setIdlength() {
        localStorage.setItem('idLength', this.idLength);
    }

    getIdLength() {
        const length = localStorage.getItem('idLength');

        return length;
    }

    reset() {
        this.inputBoxEL.value = '';
    }
}

class Start {
    constructor() {      
        this.element = new Element();
        this.getElement = new getElementTitle();
    }
}

class App {
    static init() {
        this.start = new Start();
        
    }

    static getElements() {
        return this.start.element;
    }
}

App.init();