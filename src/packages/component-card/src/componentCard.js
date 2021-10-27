import { LitElement, html, css } from "lit-element";



const apiKey = 'dc6zaTOxFJmzC';
const busqueda = 'dogs';
const limit = '3';



export class ComponentCard extends LitElement {
    async getGifs(){ 
        fetch(`https://api.giphy.com/v1/gifs/search?q=${busqueda}&limit=${limit}&api_key=${apiKey}`)
        .then(response=>response.json())
        .then(json => {
            var gif=  [ ...gif, [json.data[0].title,  json.data[0].images.fixed_height.url ]];
            debugger
            return gif;
            }
        )
        .catch(error=> console.log(error))
    }

    render() {
        
        var gifArr=this.getGifs();
        debugger
        return html`
            <section>
                
                <header>
                    <h1>title</h1>
                </header>
                <main>
                    imagen
                </main>
                <footer>
                    description
                </footer>
            </section>
        `;
    }
}