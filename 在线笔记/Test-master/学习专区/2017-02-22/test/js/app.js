var app = angular.module('app', []);
app.filter('unique', function () {
	return function (conllection, keyname) {
		var output = [];
		var keys = [];
		angular.forEach(conllection, function (item) {
			var key = item[keyname];
			if (keys.indexOf(key) === -1) {
				keys.push(key);
				output.push(item);
			}
		});
		return output;
	};
});
app.controller('MyCtrl', function ($scope, $http) {
//	$scope.showdata('公司1');
	//动态生成公司信息
	$http.get("API/queryCompanyList.json").success(function (data) {
		$scope.cname = data[0];
	});
	//点击显示给公司的情况 通过公司名称
	$scope.showdata = function (id) {
		switch (id) {
			case '公司1':
				//调用 获取各年份的金额开始  获取历史薪酬总量（应发）
				$scope.e_yearmoney(id);
				//调用 显示部门的图表
				$scope.show_dname(id);
				//薪酬总量图表（应发）
				$scope.sum_money('2016');
				break;
			case '1002':

				break;
			default:
				break;
		}
	};
	//动态生成公司信息结束

	//动态获取各年份的金额开始  获取历史薪酬总量（应发）
	$scope.e_yearmoney = function (_element) {
		
		$scope.mychart = echarts.init(document.getElementById("main"));
		//给图表添加点击事件
		$scope.mychart.on('click', function (params) {
			$scope.mychart.on('click', function (params) {
				if (params.name) {
					switch (params.name) {
						case '2011':
							//调用 薪酬总量图表函数
							$scope.sum_money(params.name);
							break;
						case '2012':
							//调用 薪酬总量图表函数
							$scope.sum_money(params.name);
							break;
						case '2013':
							//调用 薪酬总量图表函数
							$scope.sum_money(params.name);
							break;
						case '2014':
							//调用 薪酬总量图表函数
							$scope.sum_money(params.name);
							break;
						case '2015':
							//调用 薪酬总量图表函数
							$scope.sum_money(params.name);
							break;
						case '2016':
							//调用 薪酬总量图表函数
							$scope.sum_money(params.name);
							break;
						default:
							break;
					}
				}
			});

		});

		$scope.mychart.setOption({
			title: {
				text: '历史薪酬总量(应发)'
			},
			tooltip: {},
			legend: {
				data: ['金额']
			},
			xAxis: {
				data: []
			},
			yAxis: {
				name: '万元'
			},
			series: [{
				name: '金额',
				type: 'bar',
				data: []
				}]
		});

		var years = []; //年份数组
		var money = []; //金额数组

		$http.get("API/queryCompanyYearSalaryList001.json").success(function (res) {
			if (res) {
				for ( var i=0 ; i < res.length; i++) {
					years.push(res[i].wd08);
					money.push(Number(res[i].dl05) / 10000);
				}
				//动态加载数据
				$scope.mychart.setOption({
					xAxis: {
						data: years
					},
					series: {
						data: money
					}
				});
			}
		});

	};
	//动态获取各年份的金额结束 获取历史薪酬总量（应发）

	//薪酬总量图表（应发）
	$scope.sum_money = function (year) {
		$scope.charts = echarts.init(document.getElementById("main1"));
		$scope.charts.setOption({
			title: {
				text: []
			},
			tooltip: {},
			legend: [{
				data: ['本期'],
				left: '35%'
				}, {
				data: ['同期'],
				left: '45%'
				}, {
				data: ['本期累计'],
				left: '55%'
				}, {
				data: ['同期累计'],
				left: '70%'
				}],
			xAxis: {
				data: []
			},
			yAxis: {
				name: '万元'
			},
			series: [{
					name: '本期',
					type: 'bar',
					data: []
					},
				{
					name: '同期',
					type: 'bar',
					data: []
					},
				{
					name: '本期累计',
					type: 'line',
					data: []
					},
				{
					name: '同期累计',
					type: 'line',
					data: []
					}

				]

		});

		var month = []; //月份数组
		var now = []; //本期
		var synchronism = []; //同期
		var sumNow = [];
		var sumLast = [];

		$http.get("API/queryCompanyMonthSalaryList001.json").success(function (res) {
			if (res) {
				for (var i = 0; i < res.length; i++) {
					var yearData = res[i].wd08;
					//如果点击的年份与数据上的年份相同就显示本年各月份的数据
					if (yearData == year) {
						//每年的各个月份
						var everyMonth = res[i].wd09 + '月';
						month.push(everyMonth);
						//应发工资
						var shouldMoney = Number(res[i].dl05) / 10000;
						//实发工资
						var getMoney = Number(res[i].dl01) / 10000;
						now.push(shouldMoney);
						//本期累计
						var nowSum = shouldMoney + getMoney;
						sumNow.push(nowSum);
					}
					//获取去年应发的数据
					if (yearData == year - 1) {
						//去年每月应发
						var lYearShould = Number(res[i].dl05) / 10000;
						//去年每月实发
						var lYearGet = Number(res[i].dl01) / 10000;
						var lastSum = lYearShould + lYearGet;
						synchronism.push(lYearShould);
						sumLast.push(lastSum);
					}
				}

			};

			$scope.charts.setOption({
				title: {
					text: year + '薪酬总量(应发)'
				},
				xAxis: {
					data: month
				},
				series: [{
						data: now

						}, {
						data: synchronism
						},
					{
						data: sumNow
						}, {
						data: sumLast
						}
					]

			});

		});
	};
	//薪酬总量图表（应发）结束


	//获取部门名称开始
	//_elementA 公司名称
	$scope.show_dname = function (_elementA) {

			$http.get("API/queryDepartmentYearSalaryProportionList001.json").success(function (res) {
				if (res) {
					//部门名称
					$scope.dname = res;
					//占比
					$scope.percentage = res;
				};
			});
		},

		/*
		_elementB部门的名称
		_elementY年份
		_elementM金额
		*/
		$scope.department = function (_elementB, _elementY, _elementM) {
			var _elementm = parseInt(_elementM / 10000);
			switch (_elementB) {
				case '部门1':
					$scope.e_dnamemoney(_elementB, _elementY, _elementm);
					$scope.dep_yearmoney('部门1','2016');
					break;
				case '部门2':
					$scope.e_dnamemoney(_elementB, _elementY, _elementm);
					break;

				default:
					break;
			}
		};

	//以上OK

	//显示该部门各年的图表开始
	/*
	_elementB部门的名称
	_elementY年份
	_elementM金额
	*/
	$scope.e_dnamemoney = function (_elementB, _elementY, _elementM) {
		$scope.chart = echarts.init(document.getElementById("main2"));
		//配置
		$scope.chart.setOption({
			title: {
				text: _elementB + '薪酬总量'
			},
			tooltip: {},
			xAxis: {
				data:[]
			},
			yAxis: {
				name: '万元'
			},
			series: [{
				type: 'bar',
				data: []
				}]
		});
		var yeararr=[];
		var moneyarr=[];
		$http.get("API/queryDepartmentYearSalaryProportionList001.json").success(function(res){
			angular.forEach(res,function(data){
				if(data.wd13==_elementB){
					moneyarr.push(parseInt(data.dl05/10000));
					yeararr.push(data.wd08);
				}
			});
			$scope.chart.setOption({
				xAxis:{
					data:yeararr
				},
				series:{
					data:moneyarr
				}
			});
		});
		
		$scope.chart.on('click', function (params) {
			if (params.name != 'underfined') {
				switch (params.name) {
					case '2014':
						//调用显示各部门，各年薪酬同量
						$scope.dep_yearmoney(_elementB, params.name);
						break;
					case '2015':
						//调用显示各部门，各年薪酬同量
						$scope.dep_yearmoney(_elementB, params.name);
						break;

					case '2016':
						//调用显示各部门，各年薪酬同量
						$scope.dep_yearmoney(_elementB, params.name);
						break;

					default:
						break;
				}
			}
		});

	};
	//显示该部门各年的图表结束
	//获取部门名称结束

	//调用显示各部门，各年薪酬同量开始
	//_elementB,_elementY 部门，年份
	$scope.dep_yearmoney = function (_elementB, _elementY) {
	
		$scope.charta = echarts.init(document.getElementById('main3'));
		
		
		
		var option={
			title:{
				text:[]
			},
			tooltip:{},
			xAxis:{
				data:[]
			},
			yAxis:{
				name:'万元'
			},
			legend:[
				{
					data:['本期'],
					left:'35%'
				},
				{
					data:['同期'],
					left:'45%'
				},
				{
					data:['本期累计'],
					left:'55%'
				},
				{
					data:['同期累计'],
					left:'70%'
				}
			],
			series:[
				{
					name:'本期',
					type:'bar',
					data:[]
				},
				{
					name:'同期',
					type:'bar',
					data:[]
				},
				{
					name:'本期累计',
					type:'line',
					data:[]
				},
				{
					name:'同期累计',
					type:'line',
					data:[]
				}
			]
		};
		
		
		
		var mon = [];
		var lshould = []; //去年应发
		var nshould = []; //今年应发
		var lsum = []; //同期累计
		var nsum = []; //本期累计
		$http.get("API/queryDepartmentMonthSalaryList001.json").success(function(res){
			
			
			angular.forEach(res, function(data) {
				//如果点击的年份与数据上的年份相同就显示本年各月份的数据
				if(data.wd08 == _elementY && data.wd13==_elementB) {
					mon.push(data.wd09 + '月');
					nshould.push((Number(data.dl05) / 10000));
					nsum.push((Number(data.dl05) + Number(data.dl01) )/ 10000);
					
					console.log(Number(data.dl05))
				}
				//获取去年应发的数据
				if(data.wd08 == _elementY - 1 && data.wd13==_elementB) {
					lshould.push((Number(data.dl05) / 10000));
					lsum.push((Number(data.dl05) +Number(data.dl01) )/ 10000);
				}
			});
			
			
			$scope.charta.setOption({
				title:{
					text:_elementB+'@'+_elementY+'薪酬同量（应发）'
				},
				xAxis:{
					data:mon
				},
				series:[
					{
						data:nshould
					},
					{
						data:lshould
					},
					{
						data:nsum
					},
					{
						data:lsum
					}
				]
			});
			
		});
		
		$scope.charta.setOption(option);
		
	}
		//调用显示各部门，各年薪酬同量结束

})