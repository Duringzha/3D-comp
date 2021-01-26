let lineCount = 5;//一个半球显示的线数量
    let bollRadius = 200;//球体半径
    //数据部分
    let dataMain = [{
        name: "灾害",
        value: 23,
        type: "yellow"
    },{
        name: "纠纷",
        value: 36,
        type: "blue"
    },{
        name: "刑事",
        value: 9,
        type: "red"
    },{
        name: "交通",
        value: 43,
        type: "green"
    },{
        name: "其他",
        value: 18,
        type: "gray"
    }];
    createBoll(lineCount, bollRadius);
    function createDataCircle(data){
        let bollBody = document.getElementById("bollBody");
        let outCircle = bollBody.querySelector(".outCircle");
        let dataSum = sum(data);
        for(let k = 0; k < data.length; k++){
            let msgBox = document.createElement('div');
            msgBox.classList.add("msgBox");
            msgBox.classList.add(data[k].type)
            //样式设置
            let deg = 360 / data.length * k;
            msgBox.style.transform = "rotate("+ deg +"deg)";
            msgBox.style.transformOrigin = bollRadius * 1.5 + "px " + bollRadius * 1.5 + "px";
            //内容设置
            let content = document.createElement('div');
            content.className = "content";
            content.setAttribute("data-type", data[k].type);
            content.style.transform = "rotate(-"+ deg +"deg)";
            let value = Math.ceil(data[k].value / dataSum * 100);
            content.setAttribute("data-value", value + "%");
            content.innerHTML = `<div class="content_main" style="background: url(images/${data[k].type}.png);background-size: 100% 100%;">
                    <span class='contentValue'><h2>${value}<small>%</small></h2></span>
                    <span class='contentName'><h2>${data[k].name}</h2></span>
                    <div class='valueBg' style="height:${value}%;background: url(images/${data[k].type}-fill.png);background-size: 100%"></div>
                </div>`;
            content.addEventListener("click", function(event){
                let target = event.target;
                let showContent = document.getElementById("showContent");
                let topCircle = document.getElementById("topCircle");
                showContent.innerHTML = "";
                if(showContent.classList.contains("active")){
                    showContent.classList.remove("active");
                    let timer1 = setTimeout(()=>{
                        showContent.classList.add("active");
                        showContent.innerHTML = target.innerHTML;
                        clearTimeout(timer1);
                    },500);
                }else{
                    showContent.classList.add("active");
                    showContent.innerHTML = target.innerHTML;
                }
                if(topCircle.classList.contains("active")){
                    topCircle.classList.remove("active");
                    let timer = setTimeout(()=>{
                        topCircle.classList.add("active");
                        clearTimeout(timer);
                    },200);
                }else{
                    topCircle.classList.add("active");
                }
            });
            msgBox.appendChild(content);
            outCircle.appendChild(msgBox);
        }
    }
    function createBoll(lineCount, bollRadius){
        let bollBody = document.getElementById("bollBody");
        let yDom = bollBody.querySelector(".yInner");
        let lineHeight = bollRadius / lineCount;//计算线之间的距离
        let r = 0;
        //yDom.style.height = lineHeight * (lineCount * 2) - lineHeight * 3 + "px";
        for(let i = 0; i < lineCount; i++){
            lineHeight = (bollRadius / lineCount) * (i + 1);
            r = Math.sqrt(Math.pow(bollRadius, 2) - Math.pow(lineHeight, 2));
            if(i < lineCount - 2){
                let circle = document.createElement('div');
                circle.className = "circle";
                circle.style.width = r * 2 + "px";
                circle.style.height = r * 2 + "px";
                circle.style.transform = "translate3d(-50%, -50%, "+ lineHeight +"px)";
                if(i == lineCount - 3){
                    circle.style.background = "url(./images/1.png)";
                    circle.style.backgroundSize = "100% 100%";
                    circle.innerHTML = `<div class="topCircle" id="topCircle">
                        <div class="out-topCircle"></div>
                        <div class="in-topCircle"></div>
                    </div>`;
                }
                bollBody.appendChild(circle);
            }
            let circle2 = document.createElement('div');
            circle2.className = "circle";
            circle2.style.width = r * 2 + "px";
            circle2.style.height = r * 2 + "px";
            circle2.style.left = bollRadius - r + "px";
            circle2.style.top = bollRadius - r + "px";
            circle2.style.transform = "rotateX(180deg) translateZ("+ lineHeight +"px)";
            bollBody.appendChild(circle2);
        }
        for(let j = 0; j < lineCount * 3; j++){
            let circle3 = document.createElement('div');
            circle3.className = "circleY";
            circle3.style.width = bollRadius * 2 + "px";
            circle3.style.height = bollRadius * 2 + "px";
            circle3.style.transform = "rotateY("+ 360 / lineCount / 3 * j +"deg) rotateZ(55deg)";
            yDom.appendChild(circle3);
        }
        createDataCircle(dataMain);
    }
    function sum(arr) {
        var s = 0;
        arr.forEach(function(item) {
            s += item.value;
        }, 0);
        return s;
    };