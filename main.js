/* //*İstenen İşlev 1 için çözüm aşamaları:

    1) Tıklanılan koltuğa ulaşmak için onun kapsayıcısı olan container divini çek
    2) Container a bir olay izleyicisi ekle
*/


const container = document.querySelector(".container");
// console.log(container)
const infoText = document.querySelector(".info-text");
// console.log(infoText)
const totalSeatCount = document.querySelector(".amount");
// console.log(totalSeatCount)
const totalPrice = document.querySelector(".price");
// console.log(totalPrice)
const movieSelect=document.getElementById('movie');
// console.log(movieSelect)

const allSeats =document.querySelectorAll('.seat:not(.reserved)')
// console.log(allSeats); //burada veri NodeList(object) olarak döner biz bunun üzerinde işlem yapabilmek için diziye çevirmemiz gerekir.

const saveToDatabase = (willSaveIndex)=>{
    //console.log(willSaveIndex)


    //todo:veriyi JSON formatına çevirme
    const jsonIndex= JSON.stringify(willSaveIndex);
    //todo:veri tabanına koltukları kaydetme 
    localStorage.setItem('seatIndex', jsonIndex); 

    localStorage.setItem('movieIndex', JSON.stringify(movieSelect.selectedIndex))

};

const getFromDataBase= () => {
    const dbSelectedIndex =  JSON.parse(localStorage.getItem('seatIndex'))
    // return dbSelectedIndex;

    if(dbSelectedIndex!==null) {
        allSeats.forEach((seat,index) =>{
            if(dbSelectedIndex.includes(index)){
                seat.classList.add('selected')
            }
        })
    }
   
    const dbSelectedMovie = JSON.parse(localStorage.getItem('movieIndex'));
    movieSelect.selectedIndex = dbSelectedMovie;
}


getFromDataBase()// burada koltuk seçince localStorage'ta da kaydediyor. Ancak sayfayı yenileyince localStorage verisi sıfırlanıyor. 
//! bunu engellemek için bir fonksiyonun çağrıldığı yerde içindeki değerini görmek için return ile function ı döndürmemiz gerekir.


const createIndex = () => {
    //console.log('43',getFromDataBase())//localStoraage ta değerin nerede sıfırlandığını görmek için bu kod parçasını belli functionlardan önce, eklenen satır değeriyle birlikte koyarak sıfırlanan yeri bulabiliriz.

    const allSeatsArray= [];

    allSeats.forEach((seat) => {
        allSeatsArray.push(seat);//burada allSeats dizi olarak dönüyor.
    });
    //console.log('50',getFromDataBase())//localStoraage ta değerin nerede sıfırlandığını görmek için bu kod parçasını belli functionlardan önce, eklenen satır değeriyle birlikte koyarak sıfırlanan yeri bulabiliriz.

// console.log(allSeatsArray)

    const allSelectedSeatsArray= [];
    
        const selectedSeats = container.querySelectorAll('.seat.selected');//!savaToDatabase function ın kaynağı selectedIndex'in kaynağı burası!
        //console.log(selectedSeats)
    
        selectedSeats.forEach((selectedSeat) => {
            allSelectedSeatsArray.push(selectedSeat);
        });
    
        const selectedIndex = allSelectedSeatsArray.map((selectedSeat) => {
            return allSeatsArray.indexOf(selectedSeat); //map in özelliği sayesinde return kullanarak bu değeri dışarıda da kullanabiliyoruz.
        });
    
        //console.log('67',getFromDataBase())//localStoraage ta değerin nerede sıfırlandığını görmek için bu kod parçasını belli functionlardan önce, eklenen satır değeriyle birlikte koyarak sıfırlanan yeri bulabiliriz.

        //console.log(selectedIndex)
        saveToDatabase(selectedIndex);//!SIFIRLANMA SEBEBİNİ BULMAK İÇİN BU SATIRIN KAYNAĞINI BULURUZ.

        //!İŞTE BU NOKTADA SAYFA YENİLENDİĞİNDE DEĞER SIFIRLANIYOR.
        //console.log('73',getFromDataBase())//localStoraage ta değerin nerede sıfırlandığını görmek için bu kod parçasını belli functionlardan önce, eklenen satır değeriyle birlikte koyarak sıfırlanan yeri bulabiliriz.


    };





//todo: Toplam fiyat hesaplama function:

function calculateTotal(){
    createIndex()
    const selectedSeatCounts = container.querySelectorAll('.seat.selected').length;

    totalSeatCount.innerText=selectedSeatCounts;

    let selectedMoviePrice = movieSelect.options[movieSelect.selectedIndex].value;
    // console.log(selectedMoviePrice)

    totalPrice.innerText=selectedSeatCounts*selectedMoviePrice

    //*Eğer selectedSeatCounts varsa;
    if(selectedSeatCounts >0){ 
        
        infoText.classList.add('open')
    }else{
        infoText.classList.remove('open')
    }
    
}

calculateTotal() //sayfa yüklendiğinde bu function ı 1 kere çalıştır. (önceden seçilen koltukları gösterir)



+

container.addEventListener('click', (pointerEvent) =>{

    const clickedSeat = pointerEvent.target.offsetParent; //!Yalnızca .target deseydik "i" bilgisi dönerdi. offsetParent ile "i"nin kapsayıcı divine erişmiş olduk.
    

    if(
    clickedSeat.classList.contains('seat') 
    && 
    !clickedSeat.classList.contains('reserved'))
    {
        clickedSeat.classList.toggle('selected')
    }

    calculateTotal() //her seçim olduğunda da bu function a çağır.
})

movieSelect.addEventListener('change',()=>{
    calculateTotal()
})








