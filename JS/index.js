'use string';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { getAuth ,GoogleAuthProvider, signInWithPopup,signInWithRedirect,onAuthStateChanged, signOut} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';

const btnGoogle = document.querySelector('.btnSing');
const googleAuth = document.querySelector('.google');
const todos = document.querySelector('.header');

const firebaseConfig = {
  apiKey: "AIzaSyCUE61fgs5euBKBQew_BNvFDbrUtOotV6Q",
  authDomain: "signtodo-f6ca9.firebaseapp.com",
  databaseURL: "https://signtodo-f6ca9-default-rtdb.firebaseio.com",
  projectId: "signtodo-f6ca9",
  storageBucket: "signtodo-f6ca9.appspot.com",
  messagingSenderId: "415482898155",
  appId: "1:415482898155:web:5e6d9671843610626a00ae",
  measurementId: "G-D8ZNXGM3GN"
};
let user;
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const googleSign =()=>{
  signInWithPopup(auth,provider).then((ref)=>console.log(ref)).catch((err)=>console.log(err))
}
onAuthStateChanged(auth, (users)=>{
  if(users){
    console.log(' user is signed ');
    user= auth.currentUser;
    googleAuth.style.display = 'none'
    todos.style.display = 'flex'
  }
   else if(user == undefined){
    todos.style.display = 'none'

  }

})
signOut(auth).then(() => {
  console.log('Signout Succesfull')
},
(error) => {
  console.log('Signout Failed')
})

//  create button sign Google

btnGoogle.addEventListener('click',googleSign);






// список задач динамически
const todo = {
  action(e) {
    const target = e.target;
    if (target.classList.contains('todo__action')) {
      const action = target.dataset.todoAction;
      const elemItem = target.closest('.todo__item');
      if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
        elemItem.remove();
      } else {
        elemItem.dataset.todoState = action;
      }
      this.save();
    } else if (target.classList.contains('todo__add')) {
      this.add();
      this.save();
    }
  },
  add() {
    const elemText = document.querySelector('.todo__text');
    if (elemText.disabled || !elemText.value.length) {
      return;
    }
    document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(elemText.value));
    elemText.value = '';
  },
  create(text) {
    return `<li class="todo__item" data-todo-state="active">
      <span class="todo__task">${text}</span>
      <span class="todo__action todo__action_restore" data-todo-action="active"></span>
      <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
      <span class="todo__action todo__action_delete" data-todo-action="deleted"></span></li>`;
  },
  init() {
    const fromStorage = localStorage.getItem('todo');
    if (fromStorage) {
      document.querySelector('.todo__items').innerHTML = fromStorage;
    }
    document.querySelector('.todo__options').addEventListener('change', this.update);
    document.addEventListener('click', this.action.bind(this));
  },
  update() {
    const option = document.querySelector('.todo__options').value;
    document.querySelector('.todo__items').dataset.todoOption = option;
    document.querySelector('.todo__text').disabled = option !== 'active';
  },
  save() {
    localStorage.setItem('todo', document.querySelector('.todo__items').innerHTML);
  }
}
todo.init();
