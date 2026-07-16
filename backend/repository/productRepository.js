import supabase, { supabaseAdmin } from '../config/db.js';

class ProductRepository {
  async getAll(search, category, sort) {
    let query = supabase.from('products').select('*');

    if (category && category !== 'Semua') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,short_description.ilike.%${search}%,long_description.ilike.%${search}%`);
    }

    if (sort === 'price-low') {
      query = query.order('price', { ascending: true });
    } else if (sort === 'price-high') {
      query = query.order('price', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async getManaged(role, userId) {
    let query = supabaseAdmin.from('products').select('*').order('id', { ascending: true });

    if (role === 'owner_produk') {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  }

  async getMediaByProductId(id) {
    const { data, error } = await supabase
      .from('product_media')
      .select('*')
      .eq('product_id', id);
    if (error) throw error;
    return data;
  }

  async create(productData) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(productData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async update(id, updateData) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async delete(id) {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  async getOwnerId(id) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('user_id')
      .eq('id', id)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data.user_id;
  }
}

export default new ProductRepository();
