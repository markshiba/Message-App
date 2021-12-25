db.collection("cities")
  .where("state", "==", "CA")
  .onSnapshot((querySnapshot) => {
    var cities = [];
    querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
    });
    console.log("Current cities in CA: ", cities.join(", "));
  });
