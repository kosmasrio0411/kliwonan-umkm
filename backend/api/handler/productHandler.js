import supabase, { supabaseAdmin } from '../../config/db.js';

export const getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let query = supabase.from('products').select('*');

    if (category && category !== 'Semua') {
      query = query.eq('category', category);
    }

    if (search) {
      // Basic text search using ilike
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (sort === 'price-low') {
      query = query.order('priceNum', { ascending: true });
    } else if (sort === 'price-high') {
      query = query.order('priceNum', { ascending: false });
    } else {
      query = query.order('id', { ascending: true });
    }

    const { data: products, error } = await query;

    if (error) throw error;

    return res.status(200).json({
      status: 'success',
      data: products || []
    });
  } catch (error) {
    console.error('[getProducts] Error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const getManageProducts = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    
    let query = supabaseAdmin.from('products').select('*').order('id', { ascending: true });

    // If owner_produk, restrict to their own products
    if (role === 'owner_produk') {
      query = query.eq('user_id', userId);
    }
    // admin and admin_desa can see all products

    const { data: products, error } = await query;

    if (error) throw error;

    return res.status(200).json({
      status: 'success',
      data: products || []
    });
  } catch (error) {
    console.error('[getManageProducts] Error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, priceNum, imageUrl, description, phone, user_id } = req.body;
    
    if (!name || !category || !priceNum || !imageUrl || !description) {
      return res.status(400).json({ status: 'error', message: 'All fields (name, category, priceNum, imageUrl, description) are required' });
    }

    const newProduct = {
      name,
      category,
      price: `Rp ${Number(priceNum).toLocaleString('id-ID')}`,
      priceNum: Number(priceNum),
      thumbnail_url: imageUrl,
      short_description: description,
      long_description: description,
      whatsapp_number: phone || '6281234567890',
      user_id: (req.user.role === 'admin' || req.user.role === 'admin_desa') && user_id ? user_id : req.user.id
    };

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(newProduct)
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data
    });
  } catch (error) {
    console.error('[createProduct] Error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, priceNum, imageUrl, description, phone, user_id } = req.body;
    const { role, id: userId } = req.user;

    // Check ownership if owner_produk
    if (role === 'owner_produk') {
      const { data: existing, error: checkError } = await supabaseAdmin
        .from('products')
        .select('user_id')
        .eq('id', id)
        .single();
        
      if (checkError || !existing || existing.user_id !== userId) {
        return res.status(403).json({ status: 'error', message: 'Forbidden: You can only edit your own products' });
      }
    }

    const updatedData = {
      ...(name && { name }),
      ...(category && { category }),
      ...(priceNum && { priceNum: Number(priceNum), price: `Rp ${Number(priceNum).toLocaleString('id-ID')}` }),
      ...(imageUrl && { thumbnail_url: imageUrl }),
      ...(description && { short_description: description, long_description: description }),
      ...(phone && { whatsapp_number: phone }),
      ...((role === 'admin' || role === 'admin_desa') && user_id && { user_id })
    };

    const { data, error } = await supabaseAdmin
      .from('products')
      .update(updatedData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data
    });
  } catch (error) {
    console.error('[updateProduct] Error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    // Check ownership if owner_produk
    if (role === 'owner_produk') {
      const { data: existing, error: checkError } = await supabaseAdmin
        .from('products')
        .select('user_id')
        .eq('id', id)
        .single();
        
      if (checkError || !existing || existing.user_id !== userId) {
        return res.status(403).json({ status: 'error', message: 'Forbidden: You can only delete your own products' });
      }
    }

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('[deleteProduct] Error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
