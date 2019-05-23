// create a Vue instance


let app = new Vue({
    // bind it to the #root div in the DOM
    el: "#root",
    // provide data for bindings
    data: {
        searchInput: 'matilda',
        bookResults: [{
            title: '',
            author: '',
            PD: '',
            fave: false,

        }],
        loading: false,
    },
    methods: {
        async newSearch(){
            console.log("NEW SEARCH: ", this.searchInput);

            for (i = 0; i < this.searchInput.length; i++){
                if (this.searchInput.charAt(i) == ' '){
                    // this.searchInput.charAt(i) = '+';
                }
            }

            var pastSearch = '';
            var change = true;
            while (change){
                pastSearch = this.searchInput;
                console.log(pastSearch, "  ;  ", this.searchInput);
                this.searchInput = this.searchInput.replace(' ', '+')
                
                if (pastSearch == this.searchInput){
                    change = false;
                }
            }

            console.log("NEW converted: ", this.searchInput);
            
            const url = "http://openlibrary.org/search.json?q=" + this.searchInput;

            json = 'temp'
            try {
                this.loading = true;
                var response = await fetch(url);
                console.log("response= ", response);
                json = await response.json();
                console.log(json);
                this.loading = false;
            } catch {
                console.log(error);
            }

            console.log("JSON : ", json);
            console.log("JSON tittle: ", json.docs[0].title_suggest);
            console.log("NUM NUM FOUND: ", json.numFound);

            let results = "<ul>";
            // DISPLAY ALL RESULTS
            for (r = 0; r < json.numFound -1; r++){
                try {
                    console.log("FOUND: T:", json.docs[r].title_suggest,
                                "A: ", json.docs[r].author_name[0],
                                "P: ", json.docs[r].publish_date[0])
                    results += "<li>";
                    results += "Tittle: ";
                    results += json.docs[r].title_suggest;
                    results += " Author: ";
                    results += json.docs[r].author_name[0];
                    results += " Published: ";
                    results += json.docs[r].publish_date[0];
                    
                } catch {

                }
                results += "</li>";
                // this.todos.push({text: this.message, completed:false});
            }
            results += "</ul>";
            document.getElementById("please").innerHTML= results;


            // let results = "";


            // const url2 = "https://openlibrary.org/api/books?bibkeys=ISBN:" + json.docs[0].isbn[0] + "&jscmd=details&format=json";
            // var responseIMG = await fetch(url2);
            // console.log("response= ", responseIMG);
            // jsonIMG = await responseIMG.json();
            // console.log("SEE: ",jsonIMG);
            // console.log("SEE: ",jsonIMG.thumbnail_url);


            // thumbURL = jsonIMG.thumbnail_url;
            // results += '<img src="';
            // results += thumbURL;
            // results += 'alt="me" height="300">></th>'
            // document.getElementById("displayResults").innerHTML = results;

        }
    },
    computed: {
        
    }
  });


// var app = new Vue({

//     data: {
//         favourites: [{

//         }],
//         results: [{

//         }],

//         searchInput: '',
//         loading: true,
//     },

//     methods: {
//         searches() {
//             console.log("IN SEARCHES");

//             // console.log(this.searchInput);

//             // const url = "http://openlibrary.org/search.json?q=" + this.searchInput;

//             // try {
//             //     // var response = await fetch(url);
//             //     // console.log("response= ", response);
//             //     // const json = await response.json();
//             //     // console.log(json);
//             // } catch {
//             //     console.log(error);
//             // }
//         }
//     }

// });