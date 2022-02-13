var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
// var mainBtn = document.getElementById("mainBtn");
// document.getElementById("updateBtn").style.display = "none";
var productKees;
var currentIndex;
var productNameErrorInit;
var productPriceErrorInit;
var productCatErrorInit;
var productDescErrorInit;

if (localStorage.getItem("productList") == null) {
    productKees = [];
}
else {
    productKees = JSON.parse(localStorage.getItem("productList"));
    display();
}
function addProduct() {
    if (validateProductName() == true && validateProductPrice() == true && validateProductName() == true && validateProductDesc() == true) {
        var productNameValue = productName.value;
        var productPriceValue = productPrice.value;
        var productCatValue = productCat.value;
        var productDescValue = productDesc.value;

        var product = { name: productNameValue, price: productPriceValue, cate: productCatValue, Desc: productDescValue };

        productKees.push(product);
        localStorage.setItem("productList", JSON.stringify(productKees));
        clear();
        display();
    }
    // else if (checkInputs() == false) {
    //     if (productName.value == "" && productPrice.value != "" && productCat.value != "" && productDesc.value != "")
    //         document.getElementById("try").innerHTML = `<p class="text-danger" > Please Enter The product Name</p>`;
    //     if (productName.value != "" && productPrice.value == "" && productCat.value != "" && productDesc.value != "")
    //         document.getElementById("try1").innerHTML = `<p class="text-danger" > Please Enter The product Price</p>`;
    //     if (productName.value != "" && productPrice.value != "" && productCat.value == "" && productDesc.value != "")
    //         document.getElementById("try2").innerHTML = `<p class="text-danger" > Please Enter The product Category</p>`;
    //     if (productName.value != "" && productPrice.value != "" && productCat.value != "" && productDesc.value != "")
    //         document.getElementById("try3").innerHTML = `<p class="text-danger" > Please Enter The product Desc</p>`;
    // }
    else {
        if (validateProductName() == false) {
            document.getElementById("productNameError").innerHTML = productNameErrorInit;
            document.getElementById("productNameError").style.display = "block";

        }
        if (validateProductPrice() == false) {
            document.getElementById("productPriceError").innerHTML = productPriceErrorInit;
            document.getElementById("productPriceError").style.display = "block";
        }
        if (validateProductCat() == false) {
            document.getElementById("productCatError").innerHTML = productCatErrorInit;
            document.getElementById("productCatError").style.display = "block";
        }
        if (validateProductDesc() == false) {
            document.getElementById("productDescError").innerHTML = productDescErrorInit;
            document.getElementById("productDescError").style.display = "block";
        }
    }

}

function validateProductName() {
    var regex = /^[A-Z][a-z0-9]+$/;
    if (regex.test(productName.value) == true) {
        productName.classList.add("is-valid")
        return true;
    }
    else {
        productName.classList.add("is-invalid")
        var productNameError = `Product Name must start with a capital character and followed by a one or more small character`;
        productNameErrorInit = productNameError;
        return false;
    }
}
function validateProductPrice() {
    var regex = /^([1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[12][0-9][0-9][0-9][0-9]|30000)$/;
    if (regex.test(productPrice.value) == true) {
        return true;
    }
    else {

        var productPriceError = `Product price invalid. price from [10$ : 30000$]`;
        productPriceErrorInit = productPriceError;
        return false;
    }
}
function validateProductCat() {
    var regex = /^[A-Z][A-Za-z]{1,8}$/;
    if (regex.test(productCat.value) == true) {
        return true;
    }
    else {

        var productCatError = `Product category must start with a capital character and followed by from 1 to 8 small characters`;
        productCatErrorInit = productCatError;
        return false;
    }
}
function validateProductDesc() {
    var regex = /^[A-Za-z]+$/;
    if (regex.test(productDesc.value) == true) {
        return true;
    }
    else {
        var productDescError = `Enter avalid Description`;
        productDescErrorInit = productDescError;
        return false;
    }
}

function clear() {
    productName.value = "";
    productPrice.value = "";
    productCat.value = "";
    productDesc.value = "";
}
function display() {
    var hasala = ``;
    for (var i = 0; i < productKees.length; i++) {
        hasala += `<tr>
        <td>${i + 1}</td>
        <td>${productKees[i].name}</td>
        <td>${productKees[i].price}</td>
        <td>${productKees[i].cate}</td>
        <td>${productKees[i].Desc}</td>
        <td><button onclick = "changeFormForUpdate(${i})" class="btn btn-outline-warning">Update</button> </td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`
    }
    document.getElementById("displayProductHere").innerHTML = hasala;

}
function checkInputs() {
    if (productName.value != "" && productPrice.value != "" && productCat.value != "" && productDesc.value != "")

        return true;
    // else if (productName.value != "" || productPrice.value != "" || productCat.value != "" || productDesc.value != "")
    //     return false;
    // else (productName.value == "" && productPrice.value == "" && productCat.value == "" && productDesc.value == "")
    //     return 0;
    else
        return false;
}

// localStorage.setItem("Route" , "Full Stack");
// alert(localStorage.getItem("Route"));
// // localStorage.removeItem("Route");
// // localStorage.clear();
// alert(localStorage.length);

function deleteProduct(index) {
    productKees.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productKees));
    display();
}

function searchProduct(searchTerm) {
    cartoona = ``;
    searchArray = [];
    for (var i = 0; i < productKees.length; i++) {
        if (productKees[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true || productKees[i].cate.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchArray.push(productKees[i]);
        }
    }
    for (var j = 0; j < searchArray.length; j++) {
        cartoona += `<tr>
            <td>${j + 1}</td>
            <td>${searchArray[j].name}</td>
            <td>${searchArray[j].price}</td>
            <td>${searchArray[j].cate}</td>
            <td>${searchArray[j].Desc}</td>
            <td><button onclick = "changeFormForUpdate(${j})" class="btn btn-outline-warning">Update</button> </td>
            <td><button class="btn btn-outline-danger" onclick="deleteProduct(${j})">Delete</button></td>
            </tr>`
    }
    document.getElementById("displayProductHere").innerHTML = cartoona;
}

function changeFormForUpdate(productIndex) {
    currentIndex = productIndex;
    productName.value = productKees[productIndex].name;
    productPrice.value = productKees[productIndex].price;
    productCat.value = productKees[productIndex].cate;
    productDesc.value = productKees[productIndex].Desc;

    document.getElementById("mainBtn").style.display = "none";
    document.getElementById("updateBtn").style.display = "inline-block";

}

function updateProduct() {
    if (validateProductName() == true && validateProductPrice() == true && validateProductName() == true && validateProductDesc() == true) {
        productKees[currentIndex].name = productName.value;
        productKees[currentIndex].price = productPrice.value;
        productKees[currentIndex].cate = productCat.value;
        productKees[currentIndex].Desc = productDesc.value;
        localStorage.setItem("productList", JSON.stringify(productKees));
        display();
        clear();
        document.getElementById("updateBtn").style.display = "none";
        document.getElementById("mainBtn").style.display = "inline-block";
    }
    else {
        if (validateProductName() == false) {
            document.getElementById("productNameError").innerHTML = productNameErrorInit;
            document.getElementById("productNameError").style.display = "block";

        }
        if (validateProductPrice() == false) {
            document.getElementById("productPriceError").innerHTML = productPriceErrorInit;
            document.getElementById("productPriceError").style.display = "block";
        }
        if (validateProductCat() == false) {
            document.getElementById("productCatError").innerHTML = productCatErrorInit;
            document.getElementById("productCatError").style.display = "block";
        }
        if (validateProductDesc() == false) {
            document.getElementById("productDescError").innerHTML = productDescErrorInit;
            document.getElementById("productDescError").style.display = "block";
        }
    }
}

// function updateProduct(productIndex_)
// {
//     changeFormForUpdate(productIndex_);

//     productName.value = productKees[productIndex_].name;
//     productPrice.value = productKees[productIndex_].price;
//     productCat.value = productKees[productIndex_].cate;
//     productDesc.value = productKees[productIndex_].Desc;
//     // mainBtn.innerHTML = " Update ";
//     // var product = { name: productName.value, price: productPrice.value, cate: productCat.value, Desc: productDesc.value };
//     // productKees.splice(productIndex_ , 1 ,product)
// }