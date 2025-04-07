<div class="container mt-5">
        <form action="" method="post">
        @csrf
         <div class="row">
               <div class="form-group col-6 lg" >
                     <label>Prénom & Nom</label>
                     <input type="text" class="form-control" name="prenomNom"    id="prenomNom">
              </div>
              <div class="form-group col-6 lg">
                <label>Email</label>
                <input type="email" class="form-control" name="email"
                    id="email">
              </div>
          </div>
          <div class="row">
            <div class="form-group col-12 lg">
                <label>Message</label>
                <textarea class="form-control" name="message" id="message"
                    rows="4"></textarea>
            </div>
</div>
            <input type="submit" name="send" value="Submit" class="btn btn-primary btn-block">
        </form>
    </div>
