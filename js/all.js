const content = document.querySelector('.showContent');
const selZone = document.querySelector('.selZone');
const selUnit = document.querySelector('.selUnit');
const searchBtn = document.querySelector('.searchBtn');
const searchInput = document.querySelector('.searchInput');
const xhr = new XMLHttpRequest();

xhr.open('get','https://api.kcg.gov.tw/api/service/Get/12d512c7-479e-458a-b437-b225e98653c5');
xhr.send();
xhr.onload = function set(){
    let ogdata = JSON.parse(xhr.responseText);
    let data = ogdata.data;
    const kaoZone = [];
    const kaoUnit = [];
    for( let i=0 ; i<data.length ; i++){
        kaoZone.push(data[i].ZipName_);
        kaoUnit.push(data[i].UnitName_);
        }
        const area =[];
        const name = [];
        kaoZone.forEach(function(value) {
        if (area.indexOf(value) == -1) {
            area.push(value);
            }
        });
        kaoUnit.forEach(function(value) {
            if (name.indexOf(value) == -1) {
                name.push(value);
            }
        });
        let opZone = '<option value="請選擇">請選擇</option>';
        let opUnit = '<option value="請選擇">請選擇</option>';
        for (let i=0;i<area.length;i++){
            opZone += `<option value="${area[i]}">${area[i]}</option>`;
        }
        for (let i=0;i<name.length;i++){
            opUnit += `<option value="${name[i]}">${name[i]}</option>`;
        }
    selZone.innerHTML = opZone;
    selUnit.innerHTML = opUnit;
    showZone();
}
function showZone() {
    let ogdata = JSON.parse(xhr.responseText);
    let data = ogdata.data;
    let str = [];
    for (let i=0;i<data.length;i++){
        if((data[i].ZipName_ == selZone.value) && (data[i].StatusName_ =='待確認') && (selUnit.value == '請選擇')) {
            str.push({
                number:data[i].FileNo_,
                time:data[i].Cre_Date_,
                zip:data[i].ZipName_,
                add:data[i].address_,
                unit:data[i].UnitName_,
                infor:data[i].InformDesc_,
                mesg:data[i].BeforeDesc_,
                stat:data[i].StatusName_
            })
        }else if ((data[i].ZipName_ == selZone.value) && (data[i].StatusName_ =='待確認') && (selUnit.value == data[i].UnitName_)) {
            str.push({
                number:data[i].FileNo_,
                time:data[i].Cre_Date_,
                zip:data[i].ZipName_,
                add:data[i].address_,
                unit:data[i].UnitName_,
                infor:data[i].InformDesc_,
                mesg:data[i].BeforeDesc_,
                stat:data[i].StatusName_
            })
        }else if ((selZone.value == '請選擇') && (data[i].StatusName_ =='待確認') && (selUnit.value == data[i].UnitName_)) {
            str.push({
                number:data[i].FileNo_,
                time:data[i].Cre_Date_,
                zip:data[i].ZipName_,
                add:data[i].address_,
                unit:data[i].UnitName_,
                infor:data[i].InformDesc_,
                mesg:data[i].BeforeDesc_,
                stat:data[i].StatusName_
            })
        }else if ((selZone.value == '請選擇') && (data[i].StatusName_ =='待確認') && (selUnit.value == '請選擇'))  {
            let seek = data[i].BeforeDesc_.indexOf(searchInput.value);
            if (seek !== -1) {
                str.push({
                    number:data[i].FileNo_,
                    time:data[i].Cre_Date_,
                    zip:data[i].ZipName_,
                    add:data[i].address_,
                    unit:data[i].UnitName_,
                    infor:data[i].InformDesc_,
                    mesg:data[i].BeforeDesc_,
                    stat:data[i].StatusName_
                });
            }
        }   
    } 
    let contentStr = '';
    for (let i=0;i<str.length;i++){
        contentStr +=`
                    <div class="col-lg-4 mb-2">
                        <h3 class="text-dark">${str[i].zip}</h3>
                        <p class="text-secondary">地點：${str[i].add}</p>
                        <p class="text-secondary">案件編號：${str[i].number}</p>
                        <p class="text-secondary">負責局處：${str[i].unit}</p>
                        <p class="text-secondary">報案時間：${str[i].time}</p>
                        <p class="text-secondary">案件敘述：${str[i].mesg}</p>
                        <p class="text-secondary">案件類別：${str[i].infor}</p>
                        <p class="text-secondary">處理狀態：${str[i].stat}</p>
                    </div>
        `
    }
    content.innerHTML = contentStr;
}


searchBtn.addEventListener('click',showZone);
selUnit.addEventListener('change',showZone);
selZone.addEventListener('change',showZone);