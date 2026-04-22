// 农事日历页面逻辑
Page({
  data: {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    calendarWeeks: [],
    todayTasks: [
      {
        id: 1,
        title: '玉米播种',
        description: '今天是玉米播种的最佳时期，建议使用优质种子并保持适宜的土壤湿度。',
        icon: 'icon-group',
        color: '#FF9800'
      },
      {
        id: 2,
        title: '小麦病虫害防治',
        description: '注意观察小麦病虫害情况，及时喷洒农药进行防治。',
        icon: 'icon-calendar',
        color: '#4CAF50'
      }
    ]
  },
  
  onLoad: function(options) {
    console.log('农事日历页面加载');
    this.generateCalendar();
  },
  
  onShow: function() {
    console.log('农事日历页面显示');
  },
  
  generateCalendar: function() {
    const year = this.data.currentYear;
    const month = this.data.currentMonth;
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const weeks = [];
    let week = [];
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const day = currentDate.getDate();
      const isCurrentMonth = currentDate.getMonth() === month - 1;
      const isToday = currentDate.toDateString() === new Date().toDateString();
      
      // 模拟事件数据
      const events = [];
      if (isCurrentMonth && (day === 5 || day === 15 || day === 25)) {
        events.push({ color: '#4CAF50' });
      }
      if (isCurrentMonth && (day === 10 || day === 20)) {
        events.push({ color: '#FF9800' });
      }
      
      week.push({
        day: day,
        date: currentDate,
        isCurrentMonth: isCurrentMonth,
        isToday: isToday,
        events: events
      });
      
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    
    this.setData({
      calendarWeeks: weeks
    });
  },
  
  prevMonth: function() {
    let month = this.data.currentMonth - 1;
    let year = this.data.currentYear;
    
    if (month < 1) {
      month = 12;
      year--;
    }
    
    this.setData({
      currentYear: year,
      currentMonth: month
    });
    
    this.generateCalendar();
  },
  
  nextMonth: function() {
    let month = this.data.currentMonth + 1;
    let year = this.data.currentYear;
    
    if (month > 12) {
      month = 1;
      year++;
    }
    
    this.setData({
      currentYear: year,
      currentMonth: month
    });
    
    this.generateCalendar();
  },
  
  onDayTap: function(e) {
    const date = e.currentTarget.dataset.date;
    console.log('点击了日期:', date);
    // 可以在这里添加点击日期的逻辑，比如显示当天的详细农事安排
  },
  
  onTaskTap: function(e) {
    const taskId = e.currentTarget.dataset.id;
    console.log('点击了任务:', taskId);
    // 可以在这里添加点击任务的逻辑，比如跳转到任务详情页面
  },
  
  goBack: function() {
    wx.navigateBack();
  },
  
  navigateToHome: function() {
    wx.switchTab({
      url: '../index/index'
    });
  },
  
  navigateToCategory: function() {
    wx.switchTab({
      url: '../category/category'
    });
  },
  
  navigateToCart: function() {
    wx.switchTab({
      url: '../cart/cart'
    });
  },
  
  navigateToProfile: function() {
    wx.switchTab({
      url: '../profile/profile'
    });
  }
});