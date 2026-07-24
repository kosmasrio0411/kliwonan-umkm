import db from '../config/db.js';

class DashboardRepository {
  async getOverviewStats(role, userId) {
    let sql = 'SELECT * FROM products';
    let args = [];

    if (role === 'owner_produk') {
      sql += ' WHERE user_id = ?';
      args.push(userId);
    }

    const { rows: products } = await db.execute({ sql, args });

    const totalProducts = products.length;
    
    // Calculate category distribution
    const categoryDistribution = {};
    products.forEach(p => {
      const cat = p.category || 'Lainnya';
      categoryDistribution[cat] = (categoryDistribution[cat] || 0) + 1;
    });

    const activeCategories = Object.keys(categoryDistribution).length;

    // Get media count for these products
    let totalMedia = 0;
    if (totalProducts > 0) {
      const placeholders = products.map(() => '?').join(',');
      const ids = products.map(p => p.id);
      
      try {
        const { rows: media } = await db.execute({
          sql: `SELECT id FROM product_media WHERE product_id IN (${placeholders})`,
          args: ids
        });
        totalMedia = media.length;
      } catch (mediaError) {
        console.error('[DashboardRepository.getOverviewStats] Error fetching media:', mediaError);
      }
    }

    // Recent activity (last 5 products created or updated)
    const recentActivity = products.sort((a, b) => {
      if (a.created_at && b.created_at) {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return String(b.id).localeCompare(String(a.id));
    }).slice(0, 5);

    return {
      totalProducts,
      activeCategories,
      totalMedia,
      totalWhatsappClicks: 0, // Hardcoded
      categoryDistribution,
      recentActivity
    };
  }
}

export default new DashboardRepository();
