import supabase, { supabaseAdmin } from '../config/db.js';

class DashboardRepository {
  async getOverviewStats(role, userId) {
    let query = supabaseAdmin.from('products').select('*');

    if (role === 'owner_produk') {
      query = query.eq('user_id', userId);
    }

    const { data: products, error } = await query;
    
    if (error) throw error;

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
      const productIds = products.map(p => p.id);
      // Fallback if productIds length is too large for 'in', but we'll assume it's small enough for MSME
      const { data: media, error: mediaError } = await supabaseAdmin
        .from('product_media')
        .select('id')
        .in('product_id', productIds);
        
      if (!mediaError && media) {
        totalMedia = media.length;
      }
    }

    // Recent activity (last 5 products created or updated)
    // We sort by id desc since we don't know if created_at exists in products table.
    const recentActivity = products.sort((a, b) => b.id - a.id).slice(0, 5);

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
