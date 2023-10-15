// dom element selection 
const addAnotherMatchBtn   = document.querySelector(".lws-addMatch")

const matchContainer = document.querySelector('.all-matches')

const deleteMatchBtn  = document.querySelector('.lws-delete')

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

// action creator 
const addMatch = () =>{
    return {
        type : ADDANOTHERMATCH
    }
};

const deleteMatch = (payloads) =>{
    console.log(payloads)
    return {
        type: DELETEMATCH, 
        payloads
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
            const undeletedmatches = state.filter(item => item.id != action.payloads)
            console.log(undeletedmatches)
            return undeletedmatches;


        default: 
            return state;
    }
}


//create store 
const store  = Redux.createStore(scoreReducer)


// Button click event Listeners 
addAnotherMatchBtn.addEventListener("click", ()=>{
    console.log("btn is clicked ")
    store.dispatch({type: ADDANOTHERMATCH})
})

const deleteMatchBtnHandler = (id) =>{
    console.log("delte buttons has clicked ")
    store.dispatch(deleteMatch(id))
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
    elm = ``
    state.map(match => elm +=  matchHTML(match))
    return matchContainer.innerHTML = elm
}

render()
store.subscribe(render)