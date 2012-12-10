<% response.setContentType("text/javascript"); %>
<%= request.getParameter("callback") %>(
{ "success":true, "albums":[
{ "album_id":"1", "cover_picture_thumb_url":"http://tordin.fortis4.com/ptphotos/server/images/pic1.jpg", "title":"First album", date:"2012-08-23", picture_count:15 },
{ "album_id":"2", "cover_picture_thumb_url":"http://tordin.fortis4.com/ptphotos/server/images/pic2.jpg", "title":"Second album", date:"2012-08-23", picture_count:15 },
{ "album_id":"3", "cover_picture_thumb_url":"http://tordin.fortis4.com/ptphotos/server/images/pic3.jpg", "title":"Third album", date:"2012-08-23", picture_count:15 }
] }
)
