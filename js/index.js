$(document).ready(function () {
  $(".card:first").hide();
  $.ajax({
    url: "https://bbc-backend.onrender.com/get-top-books/",
    type: "GET",
    data: { page: 3, perPage: 5 },
    contentType: "applications/json",
    success: function (response) {
      $.each(response, function (index, value) {
        // console.log(index);
        // if (index % 2 == 0) {
        //   var row = $(".row:first").clone();
        //   $(row).appendTo(".container");
        // }
        var cards = $(".card:first").clone();
        var bookTitle = value["Book-Title"];
        var publisher = value["Publisher"];
        var img_url = value["Image-URL-L"];
        var rating = value["Average Ratings"];
        var author = value["Book-Author"];
        var noOfRatings = value["Number of Ratings"];

        $(cards).find(".card-img").attr("src", img_url);
        $(cards).find(".card-title").text(bookTitle);
        $(cards).find(".publisher").text(publisher);
        $(cards).find(".author").text(author);
        $(cards).find(".rating").text(rating);
        $(cards).find(".rating-no").text(noOfRatings);
        $(cards).show();
        $(cards).appendTo($(".container"));
        // console.log(value);
        // if (index == count) {
        //   createRow;
        //   count += 3;
        // }
        // creatCard(value);
      });
    },
    error: function (errorMessage) {
      console.log(errorMessage);
    },
  });
});

//   const main = document.querySelector(".main");
//   console.log(main);

//   const card = document.createElement("div");
//   card.classList = "card";

//   const bookCard = `
//     <img
//             src="https://images.unsplash.com/photo-1681664451000-f7f2845eb950?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
//             alt="" / style="height: 30px; width: 40px ">
//             <div class="info">
//               <h3>${temp["Book-Title"]}</h3>
//               <span>8.4</span>
//             </div>
//     `;

//   card.innerHTML += bookCard;
//   main.appendChild(card);

// console.log(data);

// const container = document.querySelector(".container");

// data.forEach((element, i) => {
//   let temp = JSON.stringify(data[i]);

//   const main = document.querySelector(".main");
//   console.log("We are creting card");
//   console.log(temp);

//   const card = document.createElement("div");
//   card.classList.add("col-md-4", "col-6");

//   const row = document.createElement("div");
//   row.classList.add("row", "g-3");

//   const bookcard = (card.innerHTML += bookcard);
//   row.appendChild(card);
// });

// <div class="card" style="width: 18rem">
// <img class="card-img-top" src="${temp["Image-URL-L"]}" alt="Card image cap" />
// <div class="card-body">
//   <h5 class="card-title">${temp["Book-Title"]}</h5>
//   <p class="card-text">
//     <span class="book-author">${temp["Book-Author"]}</span>
//   </p>
//   <a href="#" class="btn btn-primary">Add to Cart</a>
// </div>`;
