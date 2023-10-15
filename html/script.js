// dom element selection 
const addAnotherMatchBtn   = document.querySelector(".lws-addMatch")
const matchContainer = document.querySelector('.all-matches')


//initial state 
const initialState = [
    {
        id: 1, 
        score: 0
    }
]

//idGenerator for addMatch 
const idGenerator = (arr) =>{
    const maxId = arr.reduce((maxId, match) => Math.max(maxId, match.id), -1) 
    return maxId + 1 ; 
    
}

//action identyfier 
const ADDANOTHERMATCH = "addAnotherMatch"
const DELETEMATCH = 'matchDelete'
const INCREMENT = "increment"
const DECREMENT = "decrement"
const RESET  = "reset"

// action creator 
const addMatch = () =>{
    return {
        type : ADDANOTHERMATCH
    }
};

const deleteMatch = (payloads) =>{
    return {
        type: DELETEMATCH, 
        payloads
    }
};

const increment = (payload) =>{
    return {
        type: INCREMENT,
        payload
    }
}

const decrement = (payload) =>{
    return {
        type: DECREMENT, 
        payload
    }
};

const reset = () =>{
    return {
        type: RESET
    }
}
//reducer function 
const scoreReducer = (state = initialState, action ) =>{
    switch(action.type){
        case ADDANOTHERMATCH : 
            let newId = idGenerator(state)
            return [
                ...state, 
                {
                    id: newId , 
                    score: 0
                }
            ];

        case DELETEMATCH : 
            const undeletedmatches = state.filter(item =>{
                 const result = item.id != action.payloads;
                 console.log("result : ", result)
                return result
                })
            console.log(undeletedmatches)
            return undeletedmatches;
        
        case INCREMENT : 
                let incrementState = state.map(item => {
                    if(item.id === action.payload.id){
                        return{
                            ...item, score: item.score + Number(action.payload.value)
                        }
                    }else{
                        return item
                    }
                })
                return incrementState;
        case DECREMENT : 
                let decrementState = state.map(item => {
                    if(item.id === action.payload.id){
                        const score = item.score - Number(action.payload.value)
                        return {
                            ...item, score : score>=0 ? score : 0

                        }

                    }else{
                        return item
                    }
                })
                return decrementState;
        case RESET : 
                let restedState = state.map(item => {
                    return {
                        ...item , score: 0
                    }
                })
                return restedState;

        default: 
            return state;
    }
}


//create store 
const store  = Redux.createStore(scoreReducer)


// Button click event Listeners 
addAnotherMatchBtn.addEventListener("click", ()=>{
    console.log("btn is clicked ")
    store.dispatch(addMatch())
});


const deleteMatchBtnHandler = (id) =>{
    console.log("delte buttons has clicked ")
    store.dispatch(deleteMatch(id))
};

//incrementHandler  
const incrementHandler = (id, formElm) =>{
    const value = Number(formElm.querySelector('.lws-increment').value)
    console.log("increment field value is : ",value)
    store.dispatch(increment({id, value}))
    formElm.querySelector('.lws-increment').innerHTML = ""
};

// decrementHanlder  
const decrementHandler = (id, formElm) =>{
    const value = Number(formElm.querySelector(".lws-decrement").value)
    console.log("decrement field value is : ", value)
    store.dispatch(decrement({id, value}))
    formElm.querySelector(".lws-decrement").innerHTML = ""
}; 

// ResetHandler 
const resetHandler = () =>{
    console.log("btn is clicked");
    store.dispatch(reset())
}

// Render function 
const matchHTML  = (match) =>{
    console.log("mach details :" , match)
    return `
    <div class="match">
                    <div class="wrapper">
                        <button class="lws-delete" onClick="deleteMatchBtnHandler(${match.id})">
                            <img src="./image/delete.svg" alt="" />
                        </button>
                        <h3 class="lws-matchName">Match ${match.id}</h3>
                    </div>
                    <div class="inc-dec">
                        <form class="incrementForm" onsubmit="event.preventDefault() ; incrementHandler(${match.id}, this)">
                            <h4>Increment</h4>
                            <input
                                type="number"
                                name="increment"
                                class="lws-increment"
                            />
                        </form>
                        <form class="decrementForm" onsubmit="event.preventDefault() ; decrementHandler(${match.id}, this)">
                            <h4>Decrement</h4>
                            <input
                                type="number"
                                name="decrement"
                                class="lws-decrement"
                            />
                        </form>
                    </div>
                    <div class="numbers">
                        <h2 class="lws-singleResult">${match.score}</h2>
                    </div>
                </div>
    `
}

const render = () =>{
    const state = store.getState()
    elm = ``
    state.map(match => elm +=  matchHTML(match))
    return matchContainer.innerHTML = elm
}

render()
store.subscribe(render)