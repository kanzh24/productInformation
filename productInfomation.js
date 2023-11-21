//THAY DOI HINH ANH
const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".productThumbnail");

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
        mainImage.src = thumbnail.src;
    });
});
//TANG GIAM SO LUONG 

function decrementQuantity() {
    var quantityInput = document.getElementById("quantity");
    var currentValue = parseInt(quantityInput.value, 10);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
    }
    
    function incrementQuantity() {
    var quantityInput = document.getElementById("quantity");
    var currentValue = parseInt(quantityInput.value, 10);
    quantityInput.value = currentValue + 1;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "productData.json", true);
    }
    
      

//THEM SP VAO GIO HANG
    document.addEventListener('DOMContentLoaded', function () {
        var productsData = localStorage.getItem('productsData');
        var products = productsData ? JSON.parse(productsData) : [];
        var cart = localStorage.getItem('cart');
        var cartItems = cart ? JSON.parse(cart) : [];

        updateCartView();

        window.addToCart = function () {
            var selectedProductIndex = localStorage.getItem('selectedProductIndex');
            if (selectedProductIndex === null) {
                alert('Vui lòng chọn sản phẩm trước khi thêm vào giỏ hàng.');
                return;
            }
        
            var selectedProduct = products[selectedProductIndex];
            var productsQuantity = parseInt(document.getElementById("quantity").value); // Lấy giá trị số lượng sản phẩm
        
            if (isNaN(productsQuantity) || productsQuantity <= 0) {
                alert('Vui lòng nhập số lượng hợp lệ.');
                return;
            }
        
            var existingItemIndex = cartItems.findIndex(item => item.id === selectedProduct.id);
        
            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].quantity += productsQuantity;
            } else {
                var newItem = {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    quantity: productsQuantity,
                    hang: selectedProduct.hang, // Thêm thông tin về hãng vào đây
                };
                cartItems.push(newItem);
            }
        
            localStorage.setItem('cart', JSON.stringify(cartItems)); // Lưu thông tin sản phẩm vào giỏ hàng
        
            alert('Đã thêm sản phẩm vào giỏ hàng.');
            updateCartView();
        };
        window.removeFromCart = function (index) {
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));

            updateCartView();
        };

        function updateCartView() {
            var cartView = document.querySelector('.cart-scroll table tbody');
            var totalView = document.getElementById('total-view-cart');
            var total = 0;
            var totalQuantity = 0;
        
            if (cartItems.length === 0) {
                cartView.innerHTML = '<tr><td colspan="3" class="text-center"><img src="https://file.hstatic.net/200000525917/file/no-cart_c1e41f3edf5c45b18eb6c64306d881c8_small.png" width="60" height="60"><p>Hiện chưa có sản phẩm</p></td></tr>';
                totalView.textContent = formatCurrency(total);
                updateCartNumber(totalQuantity);
                return;
            }
        
            var cartContent = '';
            cartItems.forEach(function(item, index) {
                var selectedProduct = products.find(product => product.id === item.id); // Lấy thông tin sản phẩm từ mảng products
        
                cartContent += `
                    <tr>
                        <td><img src="${selectedProduct.img1}" width="100" height="100"></td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.quantity}</td>
                        <td><button onclick="removeFromCart(${index})">X</button></td>
                    </tr>`;
                total += parseInt(item.price.replace(/\D/g, '')) * item.quantity;
                totalQuantity += item.quantity;
            });
        
            cartView.innerHTML = cartContent;
            totalView.textContent = formatCurrency(total);
            updateCartNumber(totalQuantity);
        }

function updateCartNumber(quantity) {
var cartNumber = document.querySelector('.cartNumber');
cartNumber.textContent = quantity.toString(); // Cập nhật giá trị cartNumber
}

// Hàm định dạng số tiền
function formatCurrency(amount) {
return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}



});


//THAY DOI SAN PHAM

var selectedProductIndex = localStorage.getItem('selectedProductIndex');
var ArrayListProducts = [];


  
       // Lấy danh sách sản phẩm từ localStorage (trước khi sử dụng)
    var productsData = localStorage.getItem('productsData');
    if (productsData) {
      ArrayListProducts = JSON.parse(productsData);
    }

    function getProductDetails(index) {
      var product = ArrayListProducts[index];
      document.getElementById("name").textContent = product.name;
      document.getElementById("mainImage").src = product.img1;
      document.getElementById("ImageList1").src = product.img1;
      document.getElementById("ImageList2").src = product.img2;
      document.getElementById("ImageList3").src = product.img3;
      document.getElementById("trademark").textContent = product.hang;
      document.getElementById("tittle").textContent = product.name;
      document.getElementById("price").textContent = product.price;
      document.getElementById("cpu").textContent = product.cpu;
      document.getElementById("gpu").textContent = product.gpu;
      document.getElementById("ram").textContent = product.ram;
      document.getElementById("ssd").textContent = product.ssd;
      document.getElementById("lcd").textContent = product.lcd;
      document.getElementById("battery").textContent = product.batterycapacity;
      document.getElementById("weight").textContent = product.weight;


    }

    if (selectedProductIndex !== null) {
      getProductDetails(selectedProductIndex);
    }

//HIEN GIO HANG
function toggleDropdown() {
    var dropdown = document.getElementById("dropdownContent");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
        document.addEventListener('click', closeDropdownOutside);
    } else {
        dropdown.style.display = "none";
        document.removeEventListener('click', closeDropdownOutside);
    }
}

function closeDropdownOutside(event) {
    var dropdown = document.getElementById("dropdownContent");
    var button = document.querySelector(".cartButton");

    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.style.display = "none";
        document.removeEventListener('click', closeDropdownOutside);
    }
}

      



  

