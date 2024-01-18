insert into public.account (account_firstname, account_lastname, account_email, account_password) 
values ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

UPDATE public.account set account_type = 'Admin' where account_email = 'tony@starkent.com';

delete from public.account where account_email = 'tony@starkent.com'

UPDATE 
   public.inventory
SET 
   inv_description = 
	REPLACE(inv_description, 'small interiors','a huge interior')
WHERE 
   inv_id = 10;
   
select inv_make, inv_model, classification_name
from inventory i
Join public.classification c 
on i.classification_id = c.classification_id
Where classification_name = 'Sport'; 


update public.inventory
	Set inv_image = replace(inv_image, '/images', '/images/vehicles'), 
	inv_thumbnail = replace(inv_thumbnail, '/images', '/images/vehicles');