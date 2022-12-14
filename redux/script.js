







let counterCountainer = document.getElementById("counter-container");
const addBtn = document.getElementById("add");
const resetBtn = document.getElementById("reset");
const inputValue = document.getElementById("input-field");


// create initial state
let initialState = [
    {
        id: 1,
        value: 0,
    },
];

// create variable fro unique id
let id = 1;

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD = "add";
const RESET = "reset";


// action creators
const increment = (id, value) => {
    return {
        type: INCREMENT,
        payload: {
            value: value,
            id: id,
        },
    };
};

const decrement = (id, value) => {
    return {
        type: DECREMENT,
        payload: {
            value: value,
            id: id,
        },
    };
};

// create reducer function
function counterReducer(state = initialState, action) {
    if (action.type === ADD) {
        // add counter div after clicking addBtn
        const newCounter = {
            id: id + 1,
            value: 0,
        }
        id++;
        return [...state, newCounter];


    }
    else if (action.type === RESET) {
        // reset all counter values
        const updatedState = state.map((item) => {
            return {
                ...item,
                value: 0,
            };
        })



        return updatedState;
    }
    else if (action.type === INCREMENT) {

        const updatedState = [...state];
        console.log(action.payload.id);
        const index = updatedState.findIndex(
            (item) => item.id === action.payload.id
        );

        updatedState[index].value = action.payload.value + updatedState[index].value;
        return updatedState;

    } else if (action.type === DECREMENT) {
        const updatedState = [...state];
        const index = updatedState.findIndex(
            (item) => item.id === action.payload.id
        );
        updatedState[index].value -= action.payload.value;
        return updatedState;
    } else {
        return state;
    }
}



// create store
const store = Redux.createStore(counterReducer);



// create `new counter div when click add counter button
addBtn.addEventListener("click", function () {
    store.dispatch({
        type: ADD,
    });
});
resetBtn.addEventListener("click", function () {
    store.dispatch({
        type: RESET,
    });
});


function render() {
    counterCountainer.innerHTML = "";
    const state = store.getState();
    state.forEach((item) => {

        const div = document.createElement("div");
        div.classList =
            "p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow counter";
        const counter = document.createElement("div");
        counter.classList = "text-2xl font-semibold";
        div.appendChild(counter);
        counter.innerText = item.value;
        const btnContainer = document.createElement("div");
        btnContainer.classList = "flex space-x-3";
        const incrementInput = document.createElement("input");
        incrementInput.setAttribute("type", "number");
        incrementInput.setAttribute("placeholder", "Enter value");

        incrementInput.classList = "w-28 p-1 border border-gray-300 rounded-lg";
        incrementInput.onchange = function () {
            store.dispatch(increment(item.id, parseInt(incrementInput.value)));
        }
        const incrementBtn = document.createElement("button");
        incrementBtn.classList =
            "bg-indigo-400 text-white px-3 py-2 rounded shadow";
        incrementBtn.innerText = "Increment";

        // take 
        // incrementBtn.onclick = function () {
        //     store.dispatch(increment(item.id, inputValue));
        // };
        const decrementBtn = document.createElement("button");
        decrementBtn.classList =
            "bg-red-400 text-white px-3 py-2 rounded shadow";
        decrementBtn.innerText = "Decrement";
        decrementBtn.onclick = function () {
            store.dispatch(decrement(item.id, 5));
        };
        btnContainer.appendChild(incrementInput);
        btnContainer.appendChild(incrementBtn);
        btnContainer.appendChild(decrementBtn);
        div.appendChild(btnContainer);

        counterCountainer.appendChild(div);
        // counterCountainer.innerHTML = "";

    });
}

// update ui initially
render();

// subscribe store
store.subscribe(render);




















// // const incrementEl = document.getElementById('increment')
// // const decrementEl = document.getElementById('decrement')
// // const counterEl = document.getElementById('counter')
// // let count = 0;


// // incrementEl.addEventListener("click", () => {
// //     count++;
// //     counterEl.innerText = count;


// // })
// // decrementEl.addEventListener("click", () => {
// //     count--;
// //     counterEl.innerText = count;


// // })

// // reducer uses------------------
// // select dom element
// const incrementEl = document.getElementById('increment')
// const decrementEl = document.getElementById('decrement')
// const counterEl = document.getElementById('counter')
// const counterE2 = document.getElementById('counterButton')

// // add an element


// // action identifier
// const ADDCOUNTER = 'addCounter'
// const INCREMENT = 'increment';
// const DECREMENT = 'decrement';
// const RESET = 'reset';

// // action creators
// const increment = (value) => {
//     return (
//         {
//             type: INCREMENT,
//             payLoad: value,
//         }
//     )
// }
// const decrement = (value) => {
//     return (
//         {
//             type: DECREMENT,
//             payLoad: value,
//         }
//     )
// }
// const reset = (value) => {
//     return (
//         {
//             type: RESET,
//             payLoad: value
//         }
//     )
// }


// // initial state--------
// const initialState = {
//     value: 0,
// };
// // create reducer function
// function counterReducer(state = initialState, action) {
//     if (action.type === INCREMENT) {
//         return {
//             ...state,
//             value: state.value + action.payLoad,
//         };
//     }
//     else if (action.type === DECREMENT) {
//         return {
//             ...state,
//             value: state.value - action.payLoad,
//         };

//     }
//     else if (action.type === RESET) {
//         return {
//             ...state,
//             value: 0,
//         };

//     }
//     else {
//         return state;
//     }
// }


// // create store
// const store = Redux.createStore(counterReducer);
// const render = () => {
//     const state = store.getState();
//     counterEl.innerText = state.value;
//     const counterValue = state.value;


// }
// // update UI initially
// render();
// store.subscribe(render)

// // button click listerner
// incrementEl.addEventListener('click', () => {
//     store.dispatch(increment(5))
// })
// decrementEl.addEventListener('click', () => {
//     store.dispatch(decrement(3))
// })
// resetButton.addEventListener('click', () => {
//     store.dispatch(reset(0))
// })
// document.getElementById('add-button').addEventListener('click', function () {
//     const div = document.createElement('div');
//     div.innerHTML = `
//     <div class="text-center py-5 border w-50 mx-auto shadow ">
//             <div class="pb-5 fs-6" id=${counter}>0
                
//             </div>

//             <button type="button" id=${increment} class="btn btn-primary btn-lg">increment</button>
//             <button type="button" id=${decrement} class="btn btn-secondary btn-lg">Decrement</button>
//         </div>
//     `;
//     const section = document.getElementById("first-section");
//     section.appendChild(div);
// })