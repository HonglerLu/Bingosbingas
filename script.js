const Button = document.getElementById("Button")

// Setup Classes / Strategies
class BaseEditStrat {
    Target = null
    constructor(){
        if (new.target === BaseEditStrat){
            throw new Error("Não pode instanciar EditStrat diretamente!")
        }
    }
    SetTarget(Target){this.Target = Target}
    PushData(){throw new Error("ApplyChanges é uma propriedade abstrata, por favor a mude por inheritance!")}
}
class PushStrat extends BaseEditStrat{
    constructor(){
        super()
    }
    PushData(){
        var Form = document.getElementById("Form")
        var Data = new FormData(Form)
        var formObject = Object.fromEntries(Data.entries());
        
        var Nome = formObject.Nome
        var Idade = formObject.Idade
        var Origem = formObject.Local
        var Desc = formObject.Desc
        
        PushNewBlock(formObject)
        RenderBlocks()
    }
}
class EditStrat extends BaseEditStrat{
    constructor(){
        super()
    }
    PushData(){
        console.log("EditStrat")
    }
}

const GridColumns = 3
const Grid = document.getElementById("Grid")
const EditModes = { Push: new PushStrat(), Edit: new EditStrat() }
let EditStrategy = EditModes.Push
let DataBlocks = []

function RenderBlocks() {
    let Container = null
    let NewNodes = []
    Grid.replaceChildren()
    for (let i = 0; i < DataBlocks.length; i++){
        if (i % GridColumns == 0){
            Container = document.createElement("div")
            Container.classList.add("row")
            Grid.appendChild(Container)
            NewNodes.push(Container)
        }
        var Icon = document.createElement("div")
        Icon.classList.add("col")
        Icon.innerText = "teste"
        Container.appendChild(Icon)
    }
}

function PushNewBlock(Data) {
    DataBlocks.push(Data)
    console.log(DataBlocks)
}

document.getElementById("Submit").addEventListener('click', function(){
    EditStrategy.PushData()
})

RenderBlocks()