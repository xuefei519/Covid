

function mchi_swapDay(date){

    let numberOfModel = 6;
    // change all images for that day
    for(let i=1;i<= numberOfModel;i++){
        let imgPath =  "img_drop_model/model" +  i + "/" +  date + ".jpg" ;
        let idSmall =  "#mchi_model_"+i + "_small";
        mchi_imageExist(imgPath,idSmall);
        $("#mchi_model_"+i + "_big").attr("src",imgPath );
    }

    $("#mchi_model_subtitle").html(date );
}
 
function mchi_imageExist(imgPath,id){
    let buttonID = id + "_button" ;
    $.ajax({
       url: imgPath,
       type:'get',
       async: false,
       error:function(response){
           $(buttonID).attr('style', 'display:none;');
       }, success: function(){
            $(id).attr("src",imgPath );
            $(buttonID).attr('style', 'display:inline-block;');
         }
  })
}