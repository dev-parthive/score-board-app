// dom element selection 
const addMatchBtn = document.querySelector(".lws-addMatch")
const allMatchContainer = document.querySelector('.all-matches')




// inital state 
const initialState = [
    {
        id: 1, 
        score: 0
    }
]
 // idGenerator for addAnotherMatch  
 const idGenerator = (arr) =>{
    const maxId = arr.reduce((maxId, match) => Math.max(maxId, match.id), -1)
    return maxId + 1; 
 }
//  action identyfier 
const ADDANOTHERMATCH = "addAnotherMatch"

// action creator 

const addMatch = () =>{
    return {
        type: ADDANOTHERMATCH
    }
} 

// reducer function 
const scoreReducer = (state = initialState, action) =>{

    switch (action.type){
        case ADDANOTHERMATCH: 
            let newId = idGenerator(state)
            return[
                ...state, 
                {
                    id: newId, 
                    score: 0
                }
            ];
            default: 
                return state;
    }
}


// create store 
const store  = Redux.createStore(scoreReducer)


// Button click event Listeners 
addMatchBtn.addEventListener("click", ()=>{
    console.log("btn is clicked ");
    store.dispatch({type: ADDANOTHERMATCH})

})

// Render Function 
const matchHTML = (match) => {
    return `
    <div class="match">
                    <div class="wrapper">
                        <button class="lws-delete">
                            <img src="./image/delete.svg" alt="" />
                        </button>
                        <h3 class="lws-matchName">Match ${match.id}</h3>
                    </div>
                    <div class="inc-dec">
                        <form class="incrementForm">
                            <h4>Increment</h4>
                            <input
                                type="number"
                                name="increment"
                                class="lws-increment"
                            />
                        </form>
                        <form class="decrementForm">
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
    let elm = ``
    state.map(match => elm += matchHTML(match))
    return allMatchContainer.innerHTML = elm
}
render()
store.subscribe(render)