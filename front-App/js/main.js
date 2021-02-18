async function getMenu() {
    getALLfoods()
      var doc = await axios.get('http://localhost:3000/category');
      document.getElementById('sidebar').innerHTML = ""; 
      var data = doc.data;

      for (let i = 0; i < data.length; i++) {
          var stringTemp = `
                 
                  <div class="item" id="cat">
                      <button type="button" class="btn btn-light" onclick="getOne('${data[i]._id}')" class="arrow" style="border: none;background: white;">
                        <img src="./image/${data[i].image}" >
                       
                      </button>
                      <div class="col-md-6 mb-2 justify-content-center" style="font-size: 1.5rem;color: #666666;font-family: math;font-size: 30px;text-align: center;">
                        <span class="title">${data[i].catName} </span>
                      </div>
                  </div> 
              `
              
          document.getElementById('sidebar').innerHTML += stringTemp;
      }
  }
  
 async function getOne(id){ 

     var doc = await axios.get('http://localhost:3000/'+id);
     document.getElementById('sidebar').innerHTML = "";
     var data = doc.data;
     console.log(data);
     document.getElementById('sidebar').innerHTML =`<button onclick="getMenu()"><--</button>`
      for (let i = 0; i < data.length; i++) {
          var stringTemp = `
          <div class="item" id="cat">
                      <button type="button" class="btn btn-light"  onclick="getfood('${data[i]._id}')" class="arrow" style="background: white;">
                        <img src="./image/cat.jpg" >
                      </button>
                      <div class="col-md-6 mb-2 " style="font-size: 1.5rem;color: #666666;font-family: math;font-size: 30px;text-align: center;">
                        <span class="title">${data[i].sousCatName} </span>
                      </div>
                  </div> 
                  
                
              `
          document.getElementById('sidebar').innerHTML += stringTemp;
          

      }

  }

  async function getALLfoods(){ 

        var doc = await axios.get('http://localhost:3000/get/foods/');
        document.getElementById('food').innerHTML = "";   

        var data = doc.data;
        console.log(data);
       
        for (let i = 0; i < data.length; i++) {
            var getfood = `
            
            <div class="col-lg-3 col-md-6 col-sm-10 offset-md-0 offset-sm-1">
                  <div class="card">
                    <button onclick="getId('${data[i]._id}')" class="arrow" style="border: none;background: white;">
                      <img class="card-img-top" src="./image/${data[i].image}">
                      </button>
                      <div class="card-body" style="text-align: center">
                          <span style="color: grey; font-size: 19px">${data[i].foodName}</span>
                      
                          
                      </div>
                  </div>
              </div>
            
                `
            document.getElementById('food').innerHTML += getfood;   
        }

        }

  async function getfood(id){ 

     var doc = await axios.get('http://localhost:3000/foods/' +id);
     document.getElementById('food').innerHTML = "";
     var data = doc.data;
     console.log(data);
      for (let i = 0; i < data.length; i++) {
          var getfood = `
          
          <div class="col-lg-3 col-md-6 col-sm-10 offset-md-0 offset-sm-1">
                  <div class="card">
                    <button type="button" class="btn btn-light" onclick="getId('${data[i]._id}')" class="arrow" style="border: none;background: white;">
                    <img class="card-img-top" src="./image/${data[i].image}">
                      </button>
                      <div class="card-body" style="text-align: center">
                          <span style="color: grey; font-size: 19px">${data[i].foodName}</span>
                      </div>
                  </div>
              </div>
          
              `
          document.getElementById('food').innerHTML += getfood;   
      }
  }

  
  async function getId(idF){
            var doc = await axios.get('http://localhost:3000/showfood/' +idF);
            document.getElementById('titre').innerHTML = "";
            document.getElementById('header').innerHTML = "";
            document.getElementById('sidebar').innerHTML = "";
            document.getElementById('food').innerHTML = "";
           
            var data = doc.data[0];
            getFreeTables()
            
            var showfood = `
  
                      <div class="d-flex">
                     
                        <img src="./image/mcdo-460x460.png" class="img-fluid" style="margin-left:30px; margin-bottom:-20px"/>
                      </div>
                      <form action="#">
                        <div class="row">
                          <!-- // -->
                          <div class="col-md-4"></div>
                          <div class="col-md-4 mb-2 h2 text-dark"><span>${data.foodName}</span></div>
                          <div class="col-md-4"></div>
                          <!-- // -->
                          <div class="col-md-4"></div>
                          <div class="col-md-4 mb-2 h3 text-info" id="price"><span>${data.Price} Dh</span></div>
                          <input type="hidden" value="${data.Price}" id="originPrice">
                          <div class="col-md-4"></div>
                          <!-- // -->
                          <div class="col-md-4"></div>
                          <div class="col-md-4 mb-2">
                            <div class="form-group">
                              <select class="form-control" id="tableSelect">
                                <option value="">-- Select Table --</option>
                                
                              </select>
                            </div>
                          </div>
                          <div class="col-md-4"></div>
                          <!-- // -->
                          <div class="col-md-4"></div>
                          <div class="col-md-4 mb-2">
                            <div class="form-group">
                              <label for="number-items">Number Item(s)</label>
                              <input type="number" class="form-control" id="qte" value="1" min="1" onchange="total()" />
                            </div>
                          </div>
                          <div class="col-md-4"></div>
                          <!-- // -->
                          <div class="col-md-4"></div>
                          <div class="col-md-4 mb-2">
                            <div class="form-group d-flex justify-content-end">
                              <button class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#example" onclick="setDataInModal()">
                              Confermer la Commande
                              </button>
                            </div>
                          </div>
                          <div class="col-4"></div>
                          <!-- // -->
                        </div>
                      </form>

                    <div class="modal fade" id="example" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">invoice</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <label for="mQty" class="form-label">quantity</label>
                        <input type="text" class="form-control" id="mQty" aria-describedby="emailHelp" readonly>
                        <label for="mTotal" class="form-label">Total</label>
                        <input type="text" class="form-control" id="mTotal" aria-describedby="emailHelp" readonly>
                        <label for="code" class="form-label">your Code</label>
                        <input type="text" class="form-control" id="code" aria-describedby="emailHelp" placeholder="if you have a code "  onkeyup="getPoints()" >
                        <span id="pts"></span>
                        <div id="usingPoints"></div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary"  id="sendBtn" onclick="ordered('${data._id}')">ordered</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  
                </div>
        </div>   

               
  </div>
      
            `
            document.getElementById('commander').innerHTML = showfood;
           }


    //   async function getchoix(){
    //   var doc = await axios.get('http://localhost:3000/choix');
    //   document.getElementById('grdn').innerHTML = "";
    //   var data = doc.data;
    //   for (let i = 0; i < data.length; i++) {
    //       var choix = `

    //           <button class="btn btn-secondary" onclick="getfId('${data[i]._id}')" type="button">
    //             ${data[i].sousCatName}
    //           </button>
               
    //           `
              
    //       document.getElementById('grdn').innerHTML += choix;
    //       }
    // }

    // async function getfId(id){
    //   var doc = await axios.get('http://localhost:3000/foods/' +id);
    //   var data = doc.data;
    //   document.getElementById('fchoix').innerHTML = "";
    //   for (let i = 0; i < data.length; i++) {
    //       var fchoix = `
          

    //             <button class="dropdown-item" onclick="getFchoix('${data[i]._id}')"  type="button">
    //               ${data[i].foodName}
    //             </button>
    //           `
    //       document.getElementById('fchoix').innerHTML += fchoix;
    //       }
    // }

    // async function getFchoix(idPF){
    //         var doc = await axios.get('http://localhost:3000/showfood/' +idPF);
    //         var data = doc.data[0];
           
          
    //         var Pchoix = `
            
    //         <div class="col-lg-4 col-md-6 col-sm-10 offset-md-0 offset-sm-1">

    //           <hr>
    //            <img width="100%" height="60%" src="./image/44.jpg">
    //            <p style="margin-bottom:0em"><b>${data.foodName}</b> </p>
    //            <p><b>Price:${data.Price} DH</b> </p>
          
    //         </div>
    //         `
    //         document.getElementById('Pchoix').innerHTML += Pchoix;
    //        }

          async function getFreeTables(){
              var freeTable = await axios.get('http://localhost:3000/get/table');
              var tables = freeTable.data;
             
                for (let i = 0; i < tables.length; i++) {
                  var option = `<option>${tables[i].tableNumber}</option>`
                  document.getElementById('tableSelect').innerHTML += option 
                  }
              
          }

           function total(){

                let price = document.getElementById('originPrice').value;
                let qte = document.getElementById('qte').value;
                let total = price * qte;
                console.log(price);
                console.log(total);
                document.getElementById('price').innerHTML = total + ' ' + 'DH'

            } 


            function setDataInModal(){
                var price = document.getElementById('mTotal');
                var qte = document.getElementById('mQty');
                price.value = document.getElementById('price').textContent
                qte.value = document.getElementById('qte').value
            }
  


           // random code 
          function randomCode(min, max) {  
              return Math.floor(
                Math.random() * (max - min + 1) + min
              )
            }

            console.log(  
              randomCode(1, 9999)
            )


          async function getPoints(){
              var code = document.getElementById('code').value;
              var doc = await axios.get('http://localhost:3000/getPoints/'+code);
              const data = doc.data;
              var points = data.points;
              if(points){
                  document.getElementById('pts').innerHTML = "your points is : <span id='pt'>"+points +"</span> DH you can use";
                  document.getElementById('usingPoints').innerHTML =`
                  <label for="usePoints" class="form-label">how mutch points want to use</label>
                  <input type="text" class="form-control" id="usePoints" aria-describedby="emailHelp" placeholder="if you have a code "  onkeyup="comparePoints()" >
                  <span id="errMessage"></span>`;
              }else{
                  document.getElementById('pts').innerHTML = "";
                  document.getElementById('usingPoints').innerHTML = "";

              }
          }

          function comparePoints(){
              var MyPoints = document.getElementById('pt').textContent;
              console.log(typeof(MyPoints))
              MyPoints = parseInt(MyPoints)
              var usePoints = document.getElementById('usePoints').value;
              var message = document.getElementById('errMessage');
              var btn = document.getElementById('sendBtn');
              
                  if(usePoints != ""){
                      if(usePoints > MyPoints){
                          console.log('no');
                          message.innerHTML = 'you can\'t use more than ' + MyPoints;
                          message.style.color = 'red';
                          btn.setAttribute("disabled", true);
                      }
                      else{
                          console.log('yes');
                          message.innerHTML = "";
                          btn.removeAttribute("disabled");
                  
                      }
                  }
              
          }


          async function ordered(id) { 

              var   qte = parseInt(document.getElementById('mQty').value);
              var   usePoints = document.getElementById('usePoints');
              var   code = document.getElementById('code').value;
              var   tableSelect = document.getElementById('tableSelect').value;
              console.log(tableSelect);
              if(usePoints){
                  usePoints=usePoints.value
                  if(usePoints >0){
                      usePoints = parseInt(usePoints)
                      console.log(usePoints);
                  }
                  
              }else{
                  
                  console.log('no');
              }
              
              body = {id : id,qte:qte,usePoints:usePoints,code:code,tableSelect:tableSelect}
              const productPrice = await axios.post('http://localhost:3000/setOrder',body);
              const client = productPrice.data.client;
              console.log(client); 
          }

        let frensh = [
            {HOME:"ACCUEIL",
             ABOUT:"A PROPOSE",
             CONTACT_US:"CONTACTEZ NOUS",
             LANGUAGE:"LANGUE",
             Frensh: "Français",
             English: "Anglais",
             Arabic:"Arabe",
             FILTER_BY_CATEGORY: "FILTRE PAR CATÉGORIE"
          }
        ]
        
        const english = [
            {HOME: "HOME",
            ABOUT:"ABOUT",
            CONTACT_US:"CONTACT_US",
            LANGUAGE:"LANGUAGE",
            Frensh: "Frensh",
            Englesh: "Englesh",
            Arabic:"Arabic",
            FILTER_BY_CATEGORY:"FILTER BY CATEGORY"
          }
        ]
        
        function frenshFun() {
            document.getElementById('hometraduction').innerText = frensh[0].HOME;
            document.getElementById('abouttraduction').innerText = frensh[0].ABOUT;
            document.getElementById('contacttraduction').innerText = frensh[0].CONTACT_US;
            document.getElementById('navbarDarkDropdownMenuLink').innerText = frensh[0].LANGUAGE;
            document.getElementById('Frenshtraduction').innerText = frensh[0].Frensh;
            document.getElementById('Englishtraduction').innerText = frensh[0].English;
            document.getElementById('Arabictraduction').innerText = frensh[0].Arabic;
            document.getElementById('title').innerText = frensh[0].FILTER_BY_CATEGORY;
            // document.querySelector("html").style.direction = "rtl"
        }
        
        function englishFun() {
            document.getElementById('hometraduction').innerText = english[0].HOME;
            document.getElementById('abouttraduction').innerText = english[0].ABOUT;
            document.getElementById('contacttraduction').innerText = english[0].CONTACT_US;
            document.getElementById('navbarDarkDropdownMenuLink').innerText = english[0].LANGUAGE;
            document.getElementById('Frenshtraduction').innerText = english[0].Frensh;
            document.getElementById('Englishtraduction').innerText = english[0].Englesh;
            document.getElementById('Arabictraduction').innerText = english[0].Arabic;
            document.getElementById('title').innerText = english[0].FILTER_BY_CATEGORY;





            // document.querySelector("html").style.direction = "ltr"
        }
        