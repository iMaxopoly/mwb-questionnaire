<template>
  <div>
    <div class="pagination">
      <div @click="currentPage <= 1 ? null : currentPage -= 1" class="pagination__prev">previous</div>
      <div class="pagination__curr">{{ currentPage }}</div>
      <div @click="paginationEnd ? null : currentPage += 1" class="pagination__next">next</div>
    </div>
    <div class="search">
      <input
        class="search__input-text"
        placeholder="search..."
        type="text"
        v-model="searchTerm"
        value="">
      <input
        class="search__input-radio"
        type="radio"
        name="searchType"
        id="searchTypeAlbum"
        v-model="searchType"
        value="Album Title">
      <label class="search__input-label" for="searchTypeAlbum">Album Title</label>
      <input
        class="search__input-radio"
        type="radio"
        name="searchType"
        id="searchTypePhoto"
        v-model="searchType"
        value="Photo Title">
      <label class="search__input-label" for="searchTypePhoto">Photo Title</label>
    </div>
    <table class="table">
      <thead class="table__head">
        <tr>
          <th class="table__head--title" @click="sort('Album ID')">Album ID &dArr;</th>
          <th class="table__head--title" @click="sort('Album Title')">Album Title &dArr;</th>
          <th class="table__head--title" @click="sort('Photo Title')">Photo Title &dArr;</th>
          <th>Photo Thumbnail</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <template v-if="searchTerm !== '' && searchType !== ''">
          <tr v-for="p in paginate(search(searchTerm), currentPage)">
            <td class="table__body--album-id">{{ p.albumId }}</td>
            <td class="table__body--album-title">{{ p.albumTitle }}</td>
            <td class="table__body--photo-title">{{ p.photoTitle }}</td>
            <td>
              <img
                :src="p.photoThumbmailUrl"
                :alt="p.photoTitle"
                class="thumbnail">
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="p in paginate(photoalbums, currentPage)">
            <td class="table__body--album-id">{{ p.albumId }}</td>
            <td class="table__body--album-title">{{ p.albumTitle }}</td>
            <td class="table__body--photo-title">{{ p.photoTitle }}</td>
            <td>
              <img
                :src="p.photoThumbmailUrl"
                :alt="p.photoTitle"
                class="thumbnail">
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  data() {
    return {
      photoalbums: [],
      currentPage: 1,
      defaultPageSize: 25,
      paginationEnd: false,
      searchTerm: "",
      searchType: "Album Title"
    };
  },

  async mounted() {
    try {
      const albums = await this.fetchRemoteData(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const photos = await this.fetchRemoteData(
        "https://jsonplaceholder.typicode.com/photos"
      );

      this.photoalbums = photos.map(photo => {
        const album = albums.find(a => {
          return a.id === photo.albumId;
        });

        return {
          albumId: album.id,
          albumTitle: album.title,
          photoTitle: photo.title,
          photoThumbmailUrl: photo.thumbnailUrl
        };
      });
    } catch (err) {
      if (err) console.log(err);
    }
  },

  methods: {
    /**
     * Fetches remote data from given url.
     * @param url
     * @returns {Promise<*>}
     */
    async fetchRemoteData(url) {
      const response = await axios.get(url);
      if (!response.data) {
        throw "Data unavailable";
      }

      return response.data;
    },

    /**
     * Searches for term based on selection.
     * @param term
     */
    search(term) {
      switch (this.searchType) {
        case "Album Title":
          return this.photoalbums.filter(pa =>
            pa.albumTitle.match(new RegExp(term, "i"))
          );
        case "Photo Title":
          return this.photoalbums.filter(pa =>
            pa.photoTitle.match(new RegExp(term, "i"))
          );
        default:
          return [];
      }
    },

    paginate(array, pageNumber, pageSize = this.defaultPageSize) {
      --pageNumber;
      const items = array.slice(
        pageNumber * pageSize,
        (pageNumber + 1) * pageSize
      );

      this.paginationEnd = items <= 0;
      return items;
    },

    /**
     * Sorts elements given by the 'by' parameter.
     * @param by
     */
    sort(by) {
      switch (by) {
        case "Album ID":
          this.photoalbums.sort((a, b) => a.albumId - b.albumId);
          break;
        case "Album Title":
          this.photoalbums.sort((a, b) =>
            a.albumTitle.localeCompare(b.albumTitle)
          );
          break;
        case "Photo Title":
          this.photoalbums.sort((a, b) =>
            a.photoTitle.localeCompare(b.photoTitle)
          );
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
th,
td,
thead,
tbody {
  border: var(--color-table-border);
}

tbody > tr {
  text-align: center;
}

.table {
  background: var(--color-table-background);
  box-shadow: var(--color-table-shadow);
  border-radius: 5px;
  overflow: hidden;
  margin: 2rem auto;

  &__head {
    font-weight: bolder;
    font-size: 1rem;

    &--title {
      cursor: pointer;
    }
  }

  &__body {
    text-transform: uppercase;

    &--album-title,
    &--photo-title {
      max-width: 15rem;
    }
  }
}

.thumbnail {
  max-width: 5rem;
  clip-path: circle(2rem);
}

.pagination {
  text-align: center;
  margin: 1rem auto;
  user-select: none;

  &__prev,
  &__curr,
  &__next {
    padding: 1rem;
    background: white;
    cursor: pointer;
    box-shadow: var(--color-table-shadow);
    display: inline-block;
    transition: all 0.1s ease-in-out;
  }

  &__prev:active,
  &__next:active {
    transform: scale3d(0.9, 0.9, 1);
  }

  &__curr {
    cursor: default;
  }
}

.search {
  text-align: center;
  margin: 2rem auto;
  transition: all 0.1s ease-in-out;

  &__input-text {
    background: white;
    padding: 0.89rem;
    box-shadow: var(--color-table-shadow);
    border: none;
    outline: none;
    margin: auto 1rem auto auto;
  }

  &__input-radio {
    color: white;
    margin-left: 1rem;
  }

  &__input-label {
    color: white;
    text-transform: lowercase;
    font-weight: bolder;
    text-shadow: var(--color-font-shadow);
    font-size: large;
  }
}
</style>
