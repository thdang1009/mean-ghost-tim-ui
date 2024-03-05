export const CONSTANT = {
  USER_INFO: 'USER_INFO',
  TOKEN: 'token',
  SOCKET_ID: 'SOCKET_ID',
  PERMISSION: {
    GRAND_ADMIN: 'GRAND_ADMIN',
    ADMIN: 'ADMIN',
    MEMBER: 'MEMBER',
    GUEST: 'GUEST'
  }
}

export const DEBOUCE_TIME = 200;

export const PDF_ASSETS_PATH = window.location.origin + '/assets/pdf';

export const SAVED_CODE = 'SAVED_CODE';

export const SAVED_JSON = 'SAVED_JSON';
export const SAVED_JSON_2 = 'SAVED_JSON_2';

export const SAVED_JSON_EXCEL = 'SAVED_JSON_EXCEL';
export const SAVED_JSON_EXCEL_2 = 'SAVED_JSON_EXCEL_2';

export const SAVED_TEXT = 'SAVED_TEXT';
export const SAVED_TEXT_2 = 'SAVED_TEXT_2';

export const PDF_OBJ = 'PDF_OBJ';
export const SK_GUEST_MESSAGE = 'guest message';
export const SK_GUEST_MESSAGE_RESPONSE = 'guest message response';
export const SK_READING_INFO_REALTIME_UPDATE = 'reading info realtime update';
export const SK_RESULT_AUTO_RUN_TKT = 'SK_RESULT_AUTO_RUN_TKT';

export const HOUR = 60 * 60 * 1000;

export const LIST_TRUE_FALSE = [true, false];

export const LIST_USER_GLOBAL = [
  ['結戰丨Yue', 11366],
  ['Eren', 381859],
  ['VNSky', 382018],
  ['Chikaki', 382101],
  ['CàKhịa', 382291],
  ['AceVnAnnA', 382335],
  ['RohanZ', 382371],
  ['EnViKey', 382501],
  ['Roflan', 384613],
  ['zDHAz', 384663],
  ['Ghost1', 386079],
  ['AceVietNam', 386088],
  ['SleepingDragon', 386595],
  ['KingH', 388168],
  ['Shahanshah', 390684],
  ['NeitX', 391520],
  ['BigHit', 403322],
  ['zhoum', 412124],
  ['KaKa', 419674],
  ['ZxNAVxZ', 438202],
  ['Lâm', 449578],
  ['Duyen', 467049],
  ['ZiaTue', 469172],
  ['Lanaya', 486123],
  ['OdinX', 490293],
  ['Ozawa', 498153],
  ['Minh', 499652],
  ['nutac', 510134],
  ['APhi', 548992],
  ['ViệtNamVôĐịch', 586809],
  ['Toshio', 592109],
  ['Ina', 1442074],
  ['Yoo', 632638],
  ['Aspiri', 721011],
  ['VNtr', 730404],
  ['BigBoo', 832424],
  ['Xaku', 877448],
  ['NuHao', 812664],
  ['JakeVn', 1104927],
  ['Kittyz', 384288],
  ['VnBebu', 309789],
  ['Kjss', 59124],
  ['GàRán', 335089],
  ['Goujian', 385288],
  ['Rawshaw', 661234],
  ['Tuziel', 897599],
  ['HaLam', 613849],
  ['Kenjin', 753390],
  ['ZzNancyzZ', 359821],
  ['tuanha', 111262],
  ['XiangYu', 2683373],
  ['Kian1', 382168],
  ['hjddjd', 1097145],
  ['Thuyle', 709028],
  ['Rinvn', 391920],
  ['MrMinh', 648010],
  ['Kittyz', 384288],
  ['Pinky', 709026],
  ['Kokudo', 2986366],
  ['YenYen', 2986369],
  ['Cindyz', 3132008],
  ['Sanguo', 661234],
].map(el => ({
  account: el[0],
  id: el[1]
}));;

export const LIST_USER_VN = [
  ['Ghost', '5752941'],
  ['Kian', '5772906'],
  ['zink', '5769254'],
  ['AnhVũ', '5773870'],
  ['Ghost', '5770420'],
  ['SleepingDragon', '5774976'],
  ['Superman', '5822137'],
  ['JakieT', '5769381'],
  ['KFC', '5776445'],
  ['SleepingDragon', '5774976'],
  ['HunterHp', '5769583'],
  ['MỡMỡ', '5771474'],
  ['Cuonglin', '5781410'],
  ['LocPhat', '5773264'],
  ['TDikonBB', '5772126'],
  ['Tony', '5773795'],
  ['Heculi', '5777618'],
  ['justagame', '5907925'],
  ['ichi', '5769284'],
  ['Spectre', '5776316'],
  ['BáVương', '5770198'],
  ['Thiện', '5771181'],
  ['Nile', '5779312'],
  ['ThếHùng', '5771440'],
  ['SiêuNhân', '5769890'],
  ['LongLong', '5792801'],
  ['LongNhi', '5769999'],
  ['Kjss', '5769173'],
  ['MinhAnTQ', '5774620'],
  ['PhiLong', '5773933'],
  ['QuanYu', '5770905'],
  ['Maybee', '5770252'],
  ['LãBố', '5773266'],
  ['KhánhAn', '5776683'],
  ['Phàm', '5772019'],
  ['TảDương', '5773655'],
  ['TraiHọTrươnq', '5769177'],
  ['ThiênVũ', '5771133'],
  ['Shanks', '5769812'],
  ['ThanhTuyền', '5770659'],
  ['Gbuy', '5776182'],
  ['Nothing', '5793966'],
  ['ChanPhap', '5779318'],
  ['風中之神', '5770208'],
  ['風神', '5777459'],
  ['HắcHoả', '5773961'],
  ['Gemini', '5774291'],
  ['leechunun', '5769440'],
  ['KorewaKien', '5774994'],
  ['KorewaKienn', '5792987'],
  ['KorewaKiennn', '5784427'],
  ['KorewaKiennnn', '5807579'],
  ['CHÍTHANH', '5769538'],
  ['Paddy', '5772778'],
  ['LăngLợi', '5772752'],
  ['JakieT', '5769381'],
  ['LTA', '5769899'],
  ['NQNz', '5774099'],
  ['gấu', '5775011'],
  ['XáXíu', '5769966'],
  ['Nhansg', '5772468'],
  ['HànTín', '5770456'],
  ['WeiWei', '5775818'],
  ['OnlyVip', '5768941'],
  ['LâmPhong', '5769184'],
  ['VươngDi', '5771492'],
  ['NamAnh', '5769441'],
  ['NamCungThiếuGia', '5770631'],
  ['Quách', '5777063'],
  ['桥', '5974172'],
  ['Bối', '5772072'],
  ['DươngTai', '5771960'],
  ['DịNhân', '5793969'],
  ['MócLove', '5773804'],
  ['vinhnx', '6095361'],
  ['WuJia', '5769258'],
  ['HànhPhong', '5787383'],
  ['MaPhong', '5769178'],
  ['MrAAA', '5770970'],
  ['LươngTướngQuân', '5803905'],
  ['TàoMạnhĐức', '5769533'],
  ['AnhhùngNúp', '5769780'],
  ['thanhtan', '5773807'],
  ['TômChúa', '5769864'],
  ['tongdayhihi', '5770702'],
  ['LãnhPhong', '5776311'],
  ['QuangHiển', '5772084'],
  ['MinhPhương', '5770275'],
  ['bờm', '5777012'],
  ['LuuLinh', '5777133'],
  ['诸葛亮', '5779500'],
  ['Chơichovui', '5776395'],
  ['TiểuLong', '5768945'],
  ['ThànhChép', '5771242'],
  ['zZHHVũHHz', '5853276'],
  ['Zant', '5777456'],
  ['MitAnn', '5772288'],
  ['Doan', '5770126'],
].map(el => ({
  account: el[0],
  id: el[1]
}));

export const regexPercentage = /[\d\.\,]+\%/;