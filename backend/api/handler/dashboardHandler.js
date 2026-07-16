import dashboardService from '../../service/dashboardService.js';

const dashboardHandler = {
  async getOverview(req, res) {
    try {
      // User is injected by authMiddleware
      const { role, id: userId } = req.user;
      
      const stats = await dashboardService.getOverviewStats(role, userId);
      
      return res.status(200).json({
        status: 'success',
        data: stats
      });
    } catch (error) {
      console.error('[dashboardHandler.getOverview] Error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
};

export default dashboardHandler;
