<template>
    <div id="main">
        <div id="header"> 
            <h2>Welcome to Greenhouse</h2>
            <h4>To monitor the Greenhouse performance, please click on below parameters !</h4>
            <div id="buttonGroup">
                <button @click="getData('production')" type="submit" class="btn btn-outline-dark">Production</button>
                <button @click="getData('tomatoes')" type="submit" class="btn btn-outline-dark">Tomatoes</button>
                <button @click="getData('soil')" type="submit" class="btn btn-outline-dark">Soil</button>
                <button @click="getData('environment')" type="submit" class="btn btn-outline-dark">Environment</button>
            </div>
            
        </div>
        <div id="data">
        
        </div>
        <button @click="getSecondLargestTemp" type="submit">Temperature</button>

    </div>
    
  
</template>

<script>
import renderjson from '../../renderjson'
import axios from '../axios-data'
export default {
    data: function() {
        return {
            baseURL: 'https://greenhouse-78b8e-default-rtdb.europe-west1.firebasedatabase.app/',
            data: [],
            childNode: null,
            tempData: [],
            temp: []
        }
    },
    methods: {
        getData(key) {
            console.log("Prod data");
            axios.get(this.baseURL + key + '.json')
            .then(response=> {
                console.log(response);
                this.data= response.data;

                switch(key) {
                    case 'production' : if(this.childNode)
                                            this.childNode.remove();
                                        console.log(this.data.production);
                                        this.childNode= document.getElementById("data").appendChild(
                                                        renderjson(this.data.production));
                                        

                                        break;
                    case 'soil' :   if(this.childNode)
                                        this.childNode.remove();
                                    console.log(this.data.soil);
                                    this.childNode= document.getElementById("data").appendChild(
                                                    renderjson(this.data.soil));
                                    
                                        break;
                    case 'tomatoes' :   if(this.childNode)
                                            this.childNode.remove();
                                        console.log(this.data.tomatoes);
                                        this.childNode= document.getElementById("data").appendChild(
                                                        renderjson(this.data.tomatoes));
                                        break;
                    case 'environment' :    if(this.childNode)
                                                this.childNode.remove();
                                            console.log(this.data.environment);
                                            this.childNode= document.getElementById("data").appendChild(
                                                            renderjson(this.data.environment));
                                        break;         
                }
            })
            .catch(error=> {
                console.log(error);
            })
        },
        async getTemperatureData() {
             await axios.get(this.baseURL + 'environment.json')
            .then(response=> {
                //console.log(Object.values(response.data.environment));
                Object.values(response.data.environment).forEach(el => {
                    //console.log(Object.values(el))
                    Object.values(el).forEach(element => {
                        this.tempData.push(element.temperature);
                        
                    })
                })
                
            })
            .then(
                console.log(this.tempData)
            )
            //return this.tempData;
            //console.log(this.tempData.length);
        },
        getSecondLargestTemp() {
            this.temp= this.getTemperatureData()
                .then(
                    this.temp= this.tempData.filter(el=> {
                        return el !== undefined
                    })
                )

                console.log(this.temp);
            
        }
    },
}
</script>

<style>
.renderjson a              { text-decoration: none; }
.renderjson .disclosure    { color: crimson;
                             font-size: 150%; }
.renderjson .syntax        { color: grey; }
.renderjson .string        { color: red; }
.renderjson .number        { color: cyan; }
.renderjson .boolean       { color: plum; }
.renderjson .key           { color: lightskyblue }
.renderjson .keyword       { color: lightgoldenrodyellow; }
.renderjson .object.syntax { color: lightseagreen; }
.renderjson .array.syntax  { color: lightsalmon; }

pre.renderjson {
    display: flex;
    flex-direction: column;
}

#header {
    margin-bottom: 50px;
}

#main {
    margin-top: 100px;
}

#buttonGroup {
        margin-top: 50px;
}
</style>