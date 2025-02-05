import { UserApiService } from "./UserApiService";

const users = [
  {
    _id: "6758471a91480f3222c1c18e",
    name: "fenoll",
    firstname: "loise",
    email: "loise.fenoll@ynov.com",
    password: "$2y$10$nAu77dNUfmDtWDARTPRESu4jeDzHRVJiQOhBOHo.zQOQs1T9qCXOS",
    birthDate: "1990-01-01T00:00:00.000Z",
    city: "Paris",
    zipcode: "75001",
    role: "6758471a91480f3222c1c18c",
  },
  {
    _id: "67a327f7490068324455bbc1",
    name: "admin",
    firstname: "admin",
    email: "admin@email.com",
    password: "$2a$10$vRAiNyvAdQbed6hJUcNPkem9uNhhH1wd9xBtG3AhkEzMLe4vd.wo2",
    birthDate: "1995-02-07T00:00:00.000Z",
    city: "Montpellier",
    zipcode: "34000",
    role: "6758471a91480f3222c1c18d",
    __v: 0,
  },
];

beforeEach(() => {
  global.fetch = jest.fn();
});

it("get all users", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true, 
      json: () => Promise.resolve(users),
    })
  );

  const result = await UserApiService.getAllUsers();
  expect(result).toEqual(users);
  expect(fetch).toHaveBeenCalledTimes(1);
});