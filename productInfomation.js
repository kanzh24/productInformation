//Lay index trong ham getProductDetails de su dung cho phan danh gia
var idx;

//THAY DOI HINH ANH
const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".productThumbnail");

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
        mainImage.src = thumbnail.src;
    });
});
/*---------------------------------------------------------------------------------------*/
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
/*---------------------------------------------------------------------------------------*/    
      

//THEM SP VAO GIO HANG

document.addEventListener('DOMContentLoaded', function () {
    var productsData = localStorage.getItem('productsData');
    var products = productsData ? JSON.parse(productsData) : [];
    var cart = localStorage.getItem('cart');
    var cartItems = cart ? JSON.parse(cart) : [];

    // Hàm để lấy tham số từ URL
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Lấy tham số 'id' từ URL
    var productId = getParameterByName('id');

    // Tìm sản phẩm tương ứng trong danh sách 'products'
    var selectedProduct = products.find(product => product.id === productId);

    if (!selectedProduct) {
        console.log('Không tìm thấy thông tin sản phẩm.');
        return;
    }

    window.addToCart = function () {
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
                hang: selectedProduct.hang,
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

    // Hàm cập nhật giao diện giỏ hàng
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

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    function updateCartNumber(quantity) {
        var cartNumber = document.querySelector('.cartNumber');
        cartNumber.textContent = quantity.toString();
    }

    // Hàm định dạng số tiền
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

         updateCartView();


// Hàm xử lý khi người dùng ấn nút thêm vào giỏ hàng

});

/*---------------------------------------------------------------------------------------*/

//THAY DOI SAN PHAM

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
     idx=index;
    }

    function getProductDetailsFromURL() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const productId = urlParams.get('id');
      
        if (productId) {
          const index = ArrayListProducts.findIndex(product => product.id === productId);
          if (index !== -1) {
            getProductDetails(index);
          }
        }
      }
      
      // Gọi hàm khi trang được load
      getProductDetailsFromURL();
/*---------------------------------------------------------------------------------------*/
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
/*---------------------------------------------------------------------------------------*/
//DANH GIA SAO
document.addEventListener('DOMContentLoaded', function () {
    const starRating = document.querySelectorAll('.starRating');
    const scoreInput = document.getElementById('dvscore');

    starRating.forEach(star => {
        star.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            starRating.forEach(star => {
                if (parseInt(star.getAttribute('data-value')) <= value) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });

            scoreInput.value = value;
        });
    });
});
/*---------------------------------------------------------------------------------------*/
//GUI DANH GIA
document.addEventListener('DOMContentLoaded', function() {
    // Lắng nghe sự kiện submit của form
    document.querySelector('#btnSubmitReview').addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn việc gửi form đi (để xử lý dữ liệu)

        var product = ArrayListProducts[idx];

        // Lấy thông tin từ các trường input trong form
        var id = product.id;
        var productName = product.name;
        var name = document.querySelector('input[name="name"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var phone = document.querySelector('input[name="phone"]').value;
        var score = document.querySelector('input[name="score"]').value;
        var url = document.querySelector('input[name="url"]').value;
        var body = document.querySelector('textarea[name="body"]').value;
        var filedata = document.querySelector('input[name="filedata"]').value;

        // Tạo object chứa thông tin đánh giá
        var reviewData = {
            id: id,
            productName: productName,
            name: name,
            email: email,
            phone: phone,
            score: score,
            url: url,
            body: body,
            filedata: filedata
        };

        // Lưu thông tin đánh giá vào local storage
        localStorage.setItem('reviewData', JSON.stringify(reviewData));

        // Hiển thị thông báo hoặc thực hiện các hành động khác sau khi lưu thành công
        alert('Đánh giá của bạn đã được gửi đi.');
    });
});
/*---------------------------------------------------------------------------------------*/    
//LAY SAN PHAM LIEN QUAN

    // Lấy ra các sản phẩm cùng hãng và ngẫu nhiên 4 sản phẩm từ danh sách
    function getRandomProductsByBrand(products, brand) {
        const filteredProducts = products.filter(product => product.hang === brand);
        const randomProducts = [];

        while (randomProducts.length < 4 && randomProducts.length < filteredProducts.length) {
            const randomIndex = Math.floor(Math.random() * filteredProducts.length);
            const randomProduct = filteredProducts[randomIndex];

            // Đảm bảo không thêm sản phẩm đã được chọn trước đó
            if (!randomProducts.includes(randomProduct)) {
                randomProducts.push(randomProduct);
            }
        }

        return randomProducts;
    }

    // Hiển thị sản phẩm trên trang web
    function displayProducts(products) {
        var relatedProductsDiv = document.querySelector('.relatedProductsDv');

        products.forEach(product => {
            var productDiv = document.createElement('li');
            productDiv.classList.add('relatedProduct');

            var imgDiv = document.createElement('div');
            imgDiv.classList.add('imgvp1');

            var img = document.createElement('img');
            img.src = product.img1;
            img.alt = product.name;

            imgDiv.appendChild(img);

            
    
            var contentDiv = document.createElement('div');
            contentDiv.classList.add('content');

            var titleDiv = document.createElement('div');
            titleDiv.classList.add('title');
            titleDiv.textContent = product.name;

            var desDiv = document.createElement('div');
            desDiv.classList.add('des');
            desDiv.innerHTML = `
                <div>CPU: ${product.cpu}</div>
                <div>RAM: ${product.ram}</div>
                <div>SSD: ${product.ssd}</div>
                <div>VGA: ${product.gpu}</div>
            `;

            var priceDiv = document.createElement('div');
            priceDiv.classList.add('relatedProductPrice');
            priceDiv.textContent = `Price: ${product.price}`;

            contentDiv.appendChild(titleDiv);
            contentDiv.appendChild(desDiv);
            contentDiv.appendChild(priceDiv);

            productDiv.appendChild(imgDiv);
            productDiv.appendChild(contentDiv);
            relatedProductsDiv.appendChild(productDiv);

            productDiv.addEventListener('click', function() {
                var productId = product.id;
                var productURL = localStorage.getItem('productURL_' + productId);
                if (productURL) {
                    window.location.href = productURL;
                } else {
                    // Xử lý nếu không tìm thấy URL cho sản phẩm
                    console.error('URL not found for product:', productId);
                }
            });
        });
    }

    // Sử dụng hàm để lấy ngẫu nhiên 4 sản phẩm cùng hãng từ ArrayListProducts
    var brand = ArrayListProducts[idx].hang; // Thay đổi thành hãng bạn muốn lấy
    var randomProducts = getRandomProductsByBrand(ArrayListProducts, brand);

    // Hiển thị các sản phẩm ngẫu nhiên cùng hãng trên trang web
    displayProducts(randomProducts);
