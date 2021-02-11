async function getMenu() {
    getALLfoods()
      var doc = await axios.get('http://localhost:3000/category');
      document.getElementById('sidebar').innerHTML = ""; 
      var data = doc.data;

      for (let i = 0; i < data.length; i++) {
          var stringTemp = `
                 
                  <div class="item" id="cat">
                      <button onclick="getOne('${data[i]._id}')" class="arrow" style="border: none;background: white;">
                        <img src="./image/nav_full_menu_160x160_.jpg" >
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
                      <button onclick="getfood('${data[i]._id}')" class="arrow" style="border: none;background: white;">
                        <img src="./image/nav_full_menu_160x160_.jpg" >
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
        var data = doc.data;
        console.log(data);
       
        for (let i = 0; i < data.length; i++) {
            var getfood = `
            
            <div class="col-lg-3 col-md-6 col-sm-10 offset-md-0 offset-sm-1">
                  <div class="card">
                    <button onclick="getId('${data[i]._id}')" class="arrow" style="border: none;background: white;">
                      <img class="card-img-top" src="./image/food.png">
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
     document.getElementById('food').innerHTML = "";
      for (let i = 0; i < data.length; i++) {
          var getfood = `
          
          <div class="col-lg-3 col-md-6 col-sm-10 offset-md-0 offset-sm-1">
                  <div class="card">
                    <button onclick="getId('${data[i]._id}')" class="arrow" style="border: none;background: white;">
                      <img class="card-img-top" src="./image/food.png">
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
            document.getElementById('header').innerHTML = "";
            document.getElementById('sidebar').innerHTML = "";
            document.getElementById('food').innerHTML = "";
            document.getElementById('titre').innerHTML = "";
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
                              <select class="form-control" id="tableSelect" required>
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
              // return;
              body = {id : id,qte:qte,usePoints:usePoints,code:code,tableSelect:tableSelect}
              const productPrice = await axios.post('http://localhost:3000/setOrder',body);
              // const total = productPrice.data.total;
              const client = productPrice.data.client;
              // console.log(productPrice.data.productPrice);
              // var total = price * qte
              console.log(client); 
          }

          function changeLan(){ 
              var langElem = document.querySelector('.langElem');
              var lang = document.querySelectorAll('.lang');
              
              var table = document.querySelector('.table')
              // localStorage.setItem('lang', "english")
              var storageLan = localStorage.getItem('lang');
            
              // console.log(storageLan)
              langElem.addEventListener('click',(e)=>{
                  var lg = e.target.getAttribute('language');
                  langElem.querySelector('.active').classList.remove('active');
                  e.target.classList.add('active')
                  localStorage.setItem('lang', lg)
                  storageLan = localStorage.getItem('lang');
                  console.log(storageLan)
                  setData(storageLan)
              })
              
              setData(storageLan)
              function setData(lan) {
                  var data = {
                      "english": {
                          "table": "table number ",
                          
                      },
                      "francais": {
                          "table": "numero de table "
                      }
                  }
                  console.log(lan)
                  
                  table.textContent = data[lan].table

                
              }
          }