import { Address } from './model';

export const AddressController = {};

AddressController.create = async (req, res) => {
  const user = req.user;
  const { name, email, address, phone } = req.body;
  const addressData = {
    name,
    email,
    address,
    phone,
    user_id: user.user_id,
  };
  const data = await Address.create(addressData);
  return res.API.success('Address', data);
};

AddressController.getAll = async (req, res) => {
  const user = req.user;
  const data = await Address.getAll({ user_id: user.user_id });

  // magic!!
  // data.map(async (v) => {
  //   const x = await v.getUser();
  //   console.log('v', x);
  // });
  return res.API.success('Address List', data);
};

export default { AddressController };
