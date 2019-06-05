// create a Vue instance


let app = new Vue({
    // bind it to the #root div in the DOM
    el: "#root",
    // provide data for bindings
    data: {
        searchInput: 'matilda',
        bookResults: [{
            id: '',
            title: '',
            author: '',
            PD: '',
            fave: false,
            buttonText:'',
            imagePic:'',
            isbn: 1234,
        }],
        showFave: '',
        loading: false,
    },
    methods: {
        addFave(r){
            console.log("MAKE FAVE::: FAVE: ", this.bookResults[r].fave, " Title:", this.bookResults[r].title,
                                "Ath: ", this.bookResults[r].author,
                                "Pdate: ", this.bookResults[r].PD);
            this.bookResults[r].fave = true;
            console.log("MAKE FAVE::: FAVE: ", this.bookResults[r].fave, " Title:", this.bookResults[r].title,
                                "Ath: ", this.bookResults[r].author,
                                "Pdate: ", this.bookResults[r].PD);
            // const url = "http://openlibrary.org/search.json?q=" + this.searchInput;

            // json = 'temp'
            // try {
            //     this.loading = true;
            //     var response = await fetch(url);
            //     console.log("response= ", response);
            //     json = await response.json();
            //     console.log(json);
            //     this.loading = false;
            // } catch {
            //     console.log(error);
            // }

            // printMe = document.getElementById("please").innerHTML;


            // printMe += "Title: ";
            // printMe += json.docs[r].title_suggest;
            // printMe += " Author: ";
            // printMe += json.docs[r].author_name[0];
            // printMe += " Published: ";
            // printMe += json.docs[r].publish_date[0];

            // document.getElementById("please").innerHTML= printMe;

        },
        async newSearch(){
            this.showFave = false;
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
                    this.bookResults.push(
                            {id: r, 
                            title: json.docs[r].title_suggest, 
                            author: json.docs[r].author_name[0], 
                            PD: json.docs[r].publish_date[0], 
                            fave: false,
                            isbn: json.docs[r].isbn[0]});

                    //add the picture 
                    const url2 = "https://openlibrary.org/api/books?bibkeys=ISBN:" + this.bookResults[r].isbn + "&jscmd=details&format=json";
                    try {
                        this.loading = true;
                        var response2 = await fetch(url2);
                        console.log("response= ", response2);
                        json2 = await response2.json();
                        console.log(json2);
                        this.loading = false;
                    } catch {
                        console.log(error);
                    }
                    
                    console.log("========JSON: ", json2);
                    imglink = "json2.ISBN" + this.bookResults[r].isbn + ".thumbnail_url";
                    console.log("========JSON link: ", imglink);
                    
                    this.bookResults[r].imagePic = imglink;
                    
                    
                    
                    console.log("FOUND: T:", json.docs[r].title_suggest,
                                "A: ", json.docs[r].author_name[0],
                                "P: ", json.docs[r].publish_date[0])
                    
                } catch {

                }
                
            }
            this.bookResults.shift();
            this.display();

            // OLD

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

        },
        showFaves() {
            // this.bookResults[3].fave = true;
            // this.bookResults[4].fave = true;
            // this.bookResults[5].fave = true;
            this.showFave = true;
            console.log("UPDATING FAVORITE DISPLAY: ", this.showFave);
            this.display();
        },
        showSearch() {
            this.showFave = false;
            this.display();
        },
        display(){
            console.log("DISPLAY NOW _--------------");
            let results = "<ul>";
            for( i = 0; i < this.bookResults.length; i++){
                console.log("FAVE DISPLAY: ", this.showFave);
                if(this.showFave == this.bookResults[i].fave){
                    console.log("SHEEEEEEE: ", this.bookResults[i].imagePic);
                    console.log("BOOK: FAVE: ", this.bookResults[i].fave, " Title:", this.bookResults[i].title,
                                "Ath: ", this.bookResults[i].author,
                                "Pdate: ", this.bookResults[i].PD);
                    results += "<li>";
                    results += '<img src="this.bookResults[r].imagePic">';
                    results += '<button v-on:click="addFave(' + i + ') class=">Fave it</button>';
                    results += "Title: ";
                    results += this.bookResults[i].title;
                    results += ". Author: ";
                    results += this.bookResults[i].author;
                    results += " Published: ";
                    results += this.bookResults[i].PD;
                    results += "</li>";
                }
            }

            results += "</ul>";
            document.getElementById("displayResults").innerHTML = results;
        },
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