// 城市选择页面逻辑
import router from '@system.router';

export default {
    data: {
        hotCities: [
            { id: 1, name: "北京", cityId: "101010100" },
            { id: 2, name: "上海", cityId: "101020100" },
            { id: 3, name: "广州", cityId: "101280101" },
            { id: 4, name: "深圳", cityId: "101280601" },
            { id: 5, name: "杭州", cityId: "101210101" },
            { id: 6, name: "南京", cityId: "101190101" },
            { id: 7, name: "武汉", cityId: "101200101" },
            { id: 8, name: "郑州", cityId: "101180101" },
            { id: 9, name: "厦门", cityId: "101230201" },
            { id: 10, name: "重庆", cityId: "101040100" }
        ],

        cityGroups: [], // 按字母分组的城市列表
        allCities: [], // 所有城市
        filteredCities: [], // 搜索过滤后的城市
        searchKeyword: "", // 搜索关键词
        hasSearchResult: true // 是否有搜索结果
    },

    onInit() {
        console.log("城市选择页面初始化");
        this.loadCities();
    },

    // 加载城市数据
    loadCities() {
        console.log("开始加载城市数据");

        try {
            // 扩展的城市数据，添加cityId用于天气查询
            const cities = [
            // A
                { id: 1, name: "鞍山", pinyin: "anshan", cityId: "101070301" },
                { id: 2, name: "安庆", pinyin: "anqing", cityId: "101220601" },
                { id: 3, name: "安阳", pinyin: "anyang", cityId: "101180201" },

                // B
                { id: 4, name: "北京", pinyin: "beijing", cityId: "101010100" },
                { id: 5, name: "保定", pinyin: "baoding", cityId: "101090201" },
                { id: 6, name: "包头", pinyin: "baotou", cityId: "101080201" },
                { id: 7, name: "蚌埠", pinyin: "bengbu", cityId: "101220201" },

                // C
                { id: 8, name: "成都", pinyin: "chengdu", cityId: "101270101" },
                { id: 9, name: "重庆", pinyin: "chongqing", cityId: "101040100" },
                { id: 10, name: "长沙", pinyin: "changsha", cityId: "101250101" },
                { id: 11, name: "长春", pinyin: "changchun", cityId: "101060101" },
                { id: 12, name: "常州", pinyin: "changzhou", cityId: "101191101" },
                { id: 13, name: "沧州", pinyin: "cangzhou", cityId: "101090701" },
                { id: 14, name: "常德", pinyin: "changde", cityId: "101250601" },

                // D
                { id: 15, name: "大连", pinyin: "dalian", cityId: "101070201" },
                { id: 16, name: "东莞", pinyin: "dongguan", cityId: "101281601" },
                { id: 17, name: "大庆", pinyin: "daqing", cityId: "101050901" },
                { id: 18, name: "大同", pinyin: "datong", cityId: "101100201" },

                // E
                { id: 19, name: "鄂尔多斯", pinyin: "eerduosi", cityId: "101080701" },

                // F
                { id: 20, name: "福州", pinyin: "fuzhou", cityId: "101230101" },
                { id: 21, name: "佛山", pinyin: "foshan", cityId: "101280800" },
                { id: 22, name: "阜阳", pinyin: "fuyang", cityId: "101220801" },

                // G
                { id: 23, name: "广州", pinyin: "guangzhou", cityId: "101280101" },
                { id: 24, name: "贵阳", pinyin: "guiyang", cityId: "101260101" },
                { id: 25, name: "桂林", pinyin: "guilin", cityId: "101300501" },
                { id: 26, name: "赣州", pinyin: "ganzhou", cityId: "101240701" },

                // H
                { id: 27, name: "杭州", pinyin: "hangzhou", cityId: "101210101" },
                { id: 28, name: "哈尔滨", pinyin: "haerbin", cityId: "101050101" },
                { id: 29, name: "合肥", pinyin: "hefei", cityId: "101220101" },
                { id: 30, name: "海口", pinyin: "haikou", cityId: "101310101" },
                { id: 31, name: "呼和浩特", pinyin: "huhehaote", cityId: "101080101" },
                { id: 32, name: "惠州", pinyin: "huizhou", cityId: "101280301" },
                { id: 33, name: "邯郸", pinyin: "handan", cityId: "101091001" },
                { id: 34, name: "衡阳", pinyin: "hengyang", cityId: "101250401" },

                // J
                { id: 35, name: "济南", pinyin: "jinan", cityId: "101120101" },
                { id: 36, name: "南京", pinyin: "nanjing", cityId: "101190101" },
                { id: 37, name: "金华", pinyin: "jinhua", cityId: "101210901" },
                { id: 38, name: "嘉兴", pinyin: "jiaxing", cityId: "101210301" },

                // K
                { id: 39, name: "昆明", pinyin: "kunming", cityId: "101290101" },

                // L
                { id: 40, name: "兰州", pinyin: "lanzhou", cityId: "101160101" },
                { id: 41, name: "洛阳", pinyin: "luoyang", cityId: "101180901" },
                { id: 42, name: "临沂", pinyin: "linyi", cityId: "101120901" },
                { id: 43, name: "柳州", pinyin: "liuzhou", cityId: "101300301" },

                // M
                { id: 44, name: "绵阳", pinyin: "mianyang", cityId: "101270401" },
                { id: 45, name: "牡丹江", pinyin: "mudanjiang", cityId: "101050301" },

                // N
                { id: 46, name: "南宁", pinyin: "nanning", cityId: "101300101" },
                { id: 47, name: "南昌", pinyin: "nanchang", cityId: "101240101" },
                { id: 48, name: "宁波", pinyin: "ningbo", cityId: "101210401" },
                { id: 49, name: "南通", pinyin: "nantong", cityId: "101190501" },

                // P
                { id: 50, name: "平顶山", pinyin: "pingdingshan", cityId: "101180501" },

                // Q
                { id: 51, name: "青岛", pinyin: "qingdao", cityId: "101120201" },
                { id: 52, name: "泉州", pinyin: "quanzhou", cityId: "101230501" },
                { id: 53, name: "齐齐哈尔", pinyin: "qiqihaer", cityId: "101050201" },

                // R
                { id: 54, name: "日照", pinyin: "rizhao", cityId: "101121501" },

                // S
                { id: 55, name: "上海", pinyin: "shanghai", cityId: "101020100" },
                { id: 56, name: "深圳", pinyin: "shenzhen", cityId: "101280601" },
                { id: 57, name: "沈阳", pinyin: "shenyang", cityId: "101070101" },
                { id: 58, name: "石家庄", pinyin: "shijiazhuang", cityId: "101090101" },
                { id: 59, name: "苏州", pinyin: "suzhou", cityId: "101190401" },
                { id: 60, name: "汕头", pinyin: "shantou", cityId: "101280501" },
                { id: 61, name: "绍兴", pinyin: "shaoxing", cityId: "101210501" },
                { id: 62, name: "三亚", pinyin: "sanya", cityId: "101310201" },

                // T
                { id: 63, name: "天津", pinyin: "tianjin", cityId: "101030100" },
                { id: 64, name: "太原", pinyin: "taiyuan", cityId: "101100101" },
                { id: 65, name: "台州", pinyin: "taizhou", cityId: "101210601" },
                { id: 66, name: "唐山", pinyin: "tangshan", cityId: "101090501" },

                // W
                { id: 67, name: "武汉", pinyin: "wuhan", cityId: "101200101" },
                { id: 68, name: "无锡", pinyin: "wuxi", cityId: "101190201" },
                { id: 69, name: "温州", pinyin: "wenzhou", cityId: "101210701" },
                { id: 70, name: "乌鲁木齐", pinyin: "wulumuqi", cityId: "101130101" },
                { id: 71, name: "威海", pinyin: "weihai", cityId: "101121301" },

                // X
                { id: 72, name: "西安", pinyin: "xian", cityId: "101110101" },
                { id: 73, name: "厦门", pinyin: "xiamen", cityId: "101230201" },
                { id: 74, name: "西宁", pinyin: "xining", cityId: "101150101" },
                { id: 75, name: "徐州", pinyin: "xuzhou", cityId: "101190801" },
                { id: 76, name: "咸阳", pinyin: "xianyang", cityId: "101110200" },

                // Y
                { id: 77, name: "银川", pinyin: "yinchuan", cityId: "101170101" },
                { id: 78, name: "烟台", pinyin: "yantai", cityId: "101120501" },
                { id: 79, name: "宜昌", pinyin: "yichang", cityId: "101200901" },
                { id: 80, name: "扬州", pinyin: "yangzhou", cityId: "101190601" },
                { id: 81, name: "岳阳", pinyin: "yueyang", cityId: "101251001" },

                // Z
                { id: 82, name: "郑州", pinyin: "zhengzhou", cityId: "101180101" },
                { id: 83, name: "珠海", pinyin: "zhuhai", cityId: "101280701" },
                { id: 84, name: "淄博", pinyin: "zibo", cityId: "101120301" },
                { id: 85, name: "镇江", pinyin: "zhenjiang", cityId: "101190301" },
                { id: 86, name: "中山", pinyin: "zhongshan", cityId: "101281701" },
                { id: 87, name: "漳州", pinyin: "zhangzhou", cityId: "101230601" },
                { id: 88, name: "湛江", pinyin: "zhanjiang", cityId: "101281001" }
            ];

            console.log("原始城市数据长度:", cities.length);

            // 保存所有城市
            this.allCities = cities;
            this.filteredCities = cities;

            // 直接进行分组处理（简化版）
            const groups = {};

            // 按拼音首字母分组
            for (const city of cities) {
                if (city && city.pinyin && city.pinyin.length > 0) {
                    const firstLetter = city.pinyin.charAt(0).toUpperCase();
                    if (!groups[firstLetter]) {
                        groups[firstLetter] = [];
                    }
                    groups[firstLetter].push(city);
                }
            }

            // 创建分组数组
            const result = [];
            const sortedLetters = Object.keys(groups).sort();

            for (const letter of sortedLetters) {
                result.push({
                    letter: letter,
                    cities: groups[letter].sort((a, b) => {
                        return (a.pinyin || '').localeCompare(b.pinyin || '');
                    })
                });
            }

            console.log("分组结果:", result.length, "个字母");
            console.log("分组示例:", JSON.stringify(result.slice(0, 2)));

            // 更新数据
            this.cityGroups = result;
            this.hasSearchResult = true;

            console.log("城市数据加载成功");

        } catch (error) {
            console.error("加载城市数据出错:", error);

            // 错误时也尝试加载完整数据
            this.loadCitiesFallback();
        }
    },

    // 备用加载方法
    loadCitiesFallback() {
        console.log("使用备用方法加载城市数据");

        // 这里创建一个简化的完整数据
        const cities = [
        // A
            { id: 1, name: "鞍山", pinyin: "anshan", cityId: "101070301" },
            { id: 2, name: "安庆", pinyin: "anqing", cityId: "101220601" },
            { id: 3, name: "安阳", pinyin: "anyang", cityId: "101180201" },

            // B
            { id: 4, name: "北京", pinyin: "beijing", cityId: "101010100" },
            { id: 5, name: "保定", pinyin: "baoding", cityId: "101090201" },
            { id: 6, name: "包头", pinyin: "baotou", cityId: "101080201" },
            { id: 7, name: "蚌埠", pinyin: "bengbu", cityId: "101220201" },

            // C
            { id: 8, name: "成都", pinyin: "chengdu", cityId: "101270101" },
            { id: 9, name: "重庆", pinyin: "chongqing", cityId: "101040100" },
            { id: 10, name: "长沙", pinyin: "changsha", cityId: "101250101" },
            { id: 11, name: "长春", pinyin: "changchun", cityId: "101060101" },

            // D
            { id: 12, name: "大连", pinyin: "dalian", cityId: "101070201" },
            { id: 13, name: "东莞", pinyin: "dongguan", cityId: "101281601" },
            { id: 14, name: "大庆", pinyin: "daqing", cityId: "101050901" },

            // G
            { id: 15, name: "广州", pinyin: "guangzhou", cityId: "101280101" },

            // H
            { id: 16, name: "杭州", pinyin: "hangzhou", cityId: "101210101" },
            { id: 17, name: "哈尔滨", pinyin: "haerbin", cityId: "101050101" },
            { id: 18, name: "合肥", pinyin: "hefei", cityId: "101220101" },
            { id: 19, name: "海口", pinyin: "haikou", cityId: "101310101" },

            // N
            { id: 20, name: "南京", pinyin: "nanjing", cityId: "101190101" },
            { id: 21, name: "南昌", pinyin: "nanchang", cityId: "101240101" },
            { id: 22, name: "宁波", pinyin: "ningbo", cityId: "101210401" },
            { id: 23, name: "南通", pinyin: "nantong", cityId: "101190501" },

            // S
            { id: 24, name: "上海", pinyin: "shanghai", cityId: "101020100" },
            { id: 25, name: "深圳", pinyin: "shenzhen", cityId: "101280601" },
            { id: 26, name: "沈阳", pinyin: "shenyang", cityId: "101070101" },
            { id: 27, name: "石家庄", pinyin: "shijiazhuang", cityId: "101090101" },

            // T
            { id: 28, name: "天津", pinyin: "tianjin", cityId: "101030100" },
            { id: 29, name: "太原", pinyin: "taiyuan", cityId: "101100101" },
            { id: 30, name: "台州", pinyin: "taizhou", cityId: "101210601" },

            // W
            { id: 31, name: "武汉", pinyin: "wuhan", cityId: "101200101" },
            { id: 32, name: "无锡", pinyin: "wuxi", cityId: "101190201" },
            { id: 33, name: "温州", pinyin: "wenzhou", cityId: "101210701" },
            { id: 34, name: "乌鲁木齐", pinyin: "wulumuqi", cityId: "101130101" },

            // X
            { id: 35, name: "西安", pinyin: "xian", cityId: "101110101" },
            { id: 36, name: "厦门", pinyin: "xiamen", cityId: "101230201" }

        ];

        // 分组逻辑
        const groups = {};
        for (const city of cities) {
            if (city && city.pinyin) {
                const letter = city.pinyin.charAt(0).toUpperCase();
                if (!groups[letter]) {
                    groups[letter] = [];
                }
                groups[letter].push(city);
            }
        }

        // 转换为数组
        const result = [];
        const sortedLetters = Object.keys(groups).sort();
        for (const letter of sortedLetters) {
            result.push({
                letter: letter,
                cities: groups[letter]
            });
        }

        this.allCities = cities;
        this.filteredCities = cities;
        this.cityGroups = result;
        this.hasSearchResult = true;

        console.log("备用数据加载成功，共", cities.length, "个城市");
    },

    // 按字母分组城市（保持原方法，但使用简化的方式）
        groupCitiesByLetter(cities) {
            try {
                const groups = {};

                console.log("开始分组，城市数量:", cities.length);

                // 遍历所有城市，按拼音首字母分组
                cities.forEach(city => {
                    if (!city || !city.pinyin) {
                        console.warn("城市数据不完整:", city);
                        return;
                    }

                    const letter = city.pinyin.charAt(0).toUpperCase();
                    if (!letter) {
                        console.warn("无法获取城市拼音首字母:", city);
                        return;
                    }

                    if (!groups[letter]) {
                        groups[letter] = [];
                    }
                    groups[letter].push(city);
                });

                console.log("分组结果:", Object.keys(groups));

                // 转换为数组格式并排序
                const sortedLetters = Object.keys(groups).sort();
                console.log("排序后的字母:", sortedLetters);

                this.cityGroups = sortedLetters.map(letter => ({
                    letter,
                    cities: groups[letter].sort((a, b) => {
                        if (!a.pinyin || !b.pinyin) return 0;
                        return a.pinyin.localeCompare(b.pinyin);
                    })
                }));

                console.log("最终分组数据:", this.cityGroups.length, "个分组");

            } catch (error) {
                console.error("分组城市出错:", error);
                // 如果出错，使用空数组
                this.cityGroups = [];
            }
        },

        // 分组过滤后的城市
        groupFilteredCities() {
            try {
                const groups = {};
                this.filteredCities.forEach(city => {
                    if (city && city.pinyin) {
                        const letter = city.pinyin.charAt(0).toUpperCase();
                        if (!groups[letter]) {
                            groups[letter] = [];
                        }
                        groups[letter].push(city);
                    }
                });

                // 转换为数组格式
                const sortedLetters = Object.keys(groups).sort();
                this.cityGroups = sortedLetters.map(letter => ({
                    letter,
                    cities: groups[letter].sort((a, b) => (a.pinyin || '').localeCompare(b.pinyin || ''))
                }));

                // 检查是否有搜索结果
                this.hasSearchResult = this.filteredCities.length > 0;

                console.log("过滤后分组:", this.cityGroups.length);

            } catch (error) {
                console.error("分组过滤城市出错:", error);
            }
        },

        // 搜索城市
        searchCity(e) {
            const keyword = e.value.toLowerCase();
            this.searchKeyword = keyword;

            if (!keyword) {
                // 清空搜索关键词，显示所有城市
                this.filteredCities = this.allCities;
            } else {
                // 过滤城市：支持拼音和中文名称搜索
                const filtered = this.allCities.filter(city =>
                (city.name && city.name.toLowerCase().includes(keyword)) ||
                (city.pinyin && city.pinyin.toLowerCase().includes(keyword))
                );
                this.filteredCities = filtered;
            }

            // 重新分组过滤后的城市
            this.groupFilteredCities();
        },

        // 选择城市并跳转到天气页面
        selectCity(city) {
            console.log("选择城市:", city.name, "cityId:", city.cityId);


            // 跳转到天气页面，传递城市信息
            router.replace({
                uri: "pages/weather/weather",
                params: {
                    cityName: city.name,
                    cityId: city.cityId
                }
            });
        },

        // 处理返回按钮事件
        onBackPress() {
            // 直接返回天气页面
            router.back();
            return true;
        }
};
