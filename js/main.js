window.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("find-me").addEventListener("click", geoFindMe);
    //document.getElementById("shareBtn").addEventListener("click", share);

    function geoFindMe() {
        document.getElementById("iframe").classList.add("d-none");
        const status = document.getElementById("status");
        const mapLink = document.getElementById("map-link");
        const iframe = document.getElementById("iframe");
      
        mapLink.href = '';
        mapLink.textContent = '';
        iframe.href = '';
      
        function success(position) {
          const latitude  = position.coords.latitude;
          const longitude = position.coords.longitude;
      
          status.textContent = '';
          mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
          mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
          document.getElementById("iframe").classList.remove("d-none");
          iframe.src=`https://maps.google.com/?output=embed&q=${latitude},${longitude}`;

          const shareData = {
            title: 'מיקום',
            text: 'שותף מיקומך הנוכחי',
            url: `https://maps.google.com/?q=${latitude},${longitude}`
          }
          
          const btn = document.getElementById("shareBtn");
          const resultPara = document.getElementById("result");
          
          // Share must be triggered by "user activation"
          btn.addEventListener('click', async () => {
            try {
              await navigator.share(shareData);
              resultPara.textContent = 'שיתוף מיקומך עבר בהצלחה';
            } catch (err) {
              resultPara.textContent = `Error: ${err}`;
            }
          });

        }
      
        function error() {
            
          status.textContent = 'לא ניתן לאחזר את המיקום שלך';
        }
      
        if (!navigator.geolocation) {
          status.textContent = 'מיקום גיאוגרפי אינו נתמך על ידי הדפדפן שלך';
        } else {
          status.textContent = 'מאתר את מיקומך...';
          navigator.geolocation.getCurrentPosition(success, error);
        }
      
      }
     
    
      

})
