import dashboardRepository from '../repository/dashboardRepository.js';

const dashboardService = {
  async getOverviewStats(role, userId) {
    return await dashboardRepository.getOverviewStats(role, userId);
  }
};

export default dashboardService;
