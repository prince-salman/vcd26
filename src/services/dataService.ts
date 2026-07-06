import { supabase } from '../lib/supabase';

// News & Events
export const getNews = async () => {
  const { data, error } = await supabase.from('vcd_news').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching news:', error);
    alert('Error fetching news: ' + error.message);
    return [];
  }
  return data.map(n => ({ ...n, isTop: n.is_top }));
};

export const saveNewsItem = async (item: any) => {
  const dbItem = {
    type: item.type,
    title: item.title,
    description: item.description,
    date: item.date,
    location: item.location,
    is_top: item.isTop
  };
  
  if (item.id) {
    const { error } = await supabase.from('vcd_news').update(dbItem).eq('id', item.id);
    if (error) { console.error('Error updating news:', error); alert('Gagal update berita: ' + error.message); throw error; }
  } else {
    const { error } = await supabase.from('vcd_news').insert([dbItem]);
    if (error) { console.error('Error inserting news:', error); alert('Gagal simpan berita: ' + error.message); throw error; }
  }
};

export const deleteNewsItem = async (id: string | number) => {
  const { error } = await supabase.from('vcd_news').delete().eq('id', id);
  if (error) { console.error('Error deleting news:', error); alert('Gagal hapus berita: ' + error.message); }
};

// Artworks
export const getArtworks = async () => {
  const { data, error } = await supabase.from('vcd_artworks').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching artworks:', error);
    alert('Error fetching artworks: ' + error.message);
    return [];
  }
  return data;
};

export const uploadArtworkImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;
  
  const { error: uploadError } = await supabase.storage.from('artworks').upload(filePath, file);
  if (uploadError) {
    console.error('Upload error:', uploadError);
    alert('Gagal upload gambar: ' + uploadError.message);
    throw uploadError;
  }
  
  const { data } = supabase.storage.from('artworks').getPublicUrl(filePath);
  return data.publicUrl;
};

export const saveArtwork = async (item: any) => {
  const dbItem = {
    title: item.title,
    maker: item.maker,
    category: item.category,
    desc: item.desc,
    lecturer: item.lecturer,
    image_url: item.image_url || null
  };
  if (item.id) {
    const { error } = await supabase.from('vcd_artworks').update(dbItem).eq('id', item.id);
    if (error) { console.error('Error updating artwork:', error); alert('Gagal update karya: ' + error.message); throw error; }
  } else {
    const { error } = await supabase.from('vcd_artworks').insert([dbItem]);
    if (error) { console.error('Error inserting artwork:', error); alert('Gagal simpan karya: ' + error.message); throw error; }
  }
};

export const deleteArtwork = async (id: string | number) => {
  const { error } = await supabase.from('vcd_artworks').delete().eq('id', id);
  if (error) { console.error('Error deleting artwork:', error); alert('Gagal hapus karya: ' + error.message); }
};

// Commissions
export const getCommissions = async () => {
  const { data, error } = await supabase.from('vcd_commissions').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching commissions:', error);
    alert('Error fetching commissions: ' + error.message);
    return [];
  }
  return data;
};

export const saveCommission = async (item: any) => {
  const dbItem = {
    name: item.name,
    focus: item.focus,
    price: item.price,
    contact: item.contact,
    available: item.available
  };
  if (item.id) {
    const { error } = await supabase.from('vcd_commissions').update(dbItem).eq('id', item.id);
    if (error) { console.error('Error updating commission:', error); alert('Gagal update komisi: ' + error.message); throw error; }
  } else {
    const { error } = await supabase.from('vcd_commissions').insert([dbItem]);
    if (error) { console.error('Error inserting commission:', error); alert('Gagal simpan komisi: ' + error.message); throw error; }
  }
};

export const deleteCommission = async (id: string | number) => {
  const { error } = await supabase.from('vcd_commissions').delete().eq('id', id);
  if (error) { console.error('Error deleting commission:', error); alert('Gagal hapus komisi: ' + error.message); }
};
