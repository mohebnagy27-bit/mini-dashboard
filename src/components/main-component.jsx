import Cards from "./cards-component"
import Header from "./header-components"
import Tasklist from "./tasklist-component"

export default function Main (){
    return (
        <main className="main">
            <Header/>
            <Cards/>
            <Tasklist/>
        </main>
    )
}