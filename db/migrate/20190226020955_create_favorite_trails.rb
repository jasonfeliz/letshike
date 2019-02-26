class CreateFavoriteTrails < ActiveRecord::Migration[5.2]
  def change
    create_table :favorite_trails do |t|
      t.references :user
      t.integer :trail_id

      t.timestamps
    end
  end
end
